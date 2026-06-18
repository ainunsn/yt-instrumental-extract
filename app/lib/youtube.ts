import path from 'path'
import fs from 'fs'
import { YtDlp } from 'ytdlp-nodejs'
import { convertmp4tomp3 } from './ffmpeg'

const ytDlp = new YtDlp()

export async function downloadYoutubeAudio(
  youtubeUrl: string,
  jobId: string
): Promise<{
  youtubeTitle: string,
  destination: string
}> {

  try {
    const result = await ytDlp
      .download(youtubeUrl)
      .filter('mergevideo')
      .quality('360p')
      .type('mp4')
      .on('progress', (p) => console.log(`${p.percentage_str}`))
      .run()

    const outputPath = path.join(process.cwd(), `public/${jobId}`)
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true })
    }

    const source = result.filePaths[0]
    const name = result.filePaths[0].split('/').pop()?.split('.')[0] || 'audio'

    const destination = path.join(
      outputPath,
      `${jobId}.mp3`
    )

    await convertmp4tomp3(source, destination)

    fs.rmSync(source, { force: true })

    return {
      youtubeTitle: `${name}.mp3`,
      destination: destination
    }
  } catch (error) {
    throw new Error(`Failed to download audio: ${error}`)
  }
}