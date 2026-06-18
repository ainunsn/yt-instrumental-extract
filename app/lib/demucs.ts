import path from 'path'
import fs from 'fs'
import { execCommand } from './exec'

export async function separateAudio(
  wavFile: string,
  jobId: string
) {
  const outputDir = path.join(
    process.cwd(),
    `public/${jobId}`
  )

  await execCommand(`
    python3 -m demucs --mp3 \
    --two-stems=vocals \
    -o "${outputDir}" \
    "${wavFile}"
  `)

  const trackName = path.basename(wavFile, '.mp3')

  const demucsFolder = path.join(
    outputDir,
    'htdemucs',
    trackName
  )

  const vocals = path.join(demucsFolder, 'vocals.mp3')
  const noVocals = path.join(demucsFolder, 'no_vocals.mp3')

  if (!fs.existsSync(vocals)) {
    throw new Error('Vocals file missing')
  }

  return {
    vocals,
    noVocals,
  }
}