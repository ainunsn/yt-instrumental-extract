require('dotenv').config()
import { PrismaClient } from '@/app/generated/prisma/client'
import { separateAudio } from '@/app/lib/demucs'
import { downloadYoutubeAudio } from '@/app/lib/youtube'
import { PrismaPg } from '@prisma/adapter-pg'

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })
})

async function processJob(jobId: string) {
  try {
    await prisma.audioJob.update({
      where: {
        id: jobId,
      },
      data: {
        status: 'PROCESSING',
      },
    })

    const job =
      await prisma.audioJob.findUnique({
        where: {
          id: jobId,
        },
      })

    console.log(job, 'this is job')

    if (!job) return

    console.log(
      'Processing:',
      job.youtubeUrl
    )

    /*
      1. Download youtube audio
      2. Run vocal separation
      3. Upload files
    */

    console.log('Downloading audio...')
    const downloaded = await downloadYoutubeAudio(job.youtubeUrl, jobId)

    console.log(downloaded, 'downloaded file')

    await separateAudio(
      downloaded.destination,
      jobId
    );

    await prisma.audioJob.update({
      where: {
        id: jobId,
      },
      data: {
        status: 'COMPLETED',
        vocalsPath: `${jobId}/htdemucs/${jobId}/vocals.mp3`,
        instrumentalPath: `${jobId}/htdemucs/${jobId}/no_vocals.mp3`,
        audioPath: `${jobId}/${jobId}.mp3`,
        youtubeTitle: downloaded.youtubeTitle,
      },
    })

    console.log(
      'Completed:',
      jobId
    )
  } catch (error) {
    await prisma.audioJob.update({
      where: {
        id: jobId,
      },
      data: {
        status: 'FAILED',
        error:
          error instanceof Error
            ? error.message
            : 'Unknown error',
      },
    })
  }
}

async function runWorker() {
  while (true) {
    const job =
      await prisma.audioJob.findFirst({
        where: {
          status: 'PENDING',
        },
        orderBy: {
          createdAt: 'asc',
        },
      })

    if (job) {
      await processJob(job.id)
    } else {
      await new Promise((resolve) =>
        setTimeout(resolve, 5000)
      )
    }
  }
}

runWorker()