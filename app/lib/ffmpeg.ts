import { execCommand } from './exec'

export function resizeAudio(input: string, output: string) {
  return execCommand(`ffmpeg -i "${input}" -b:a 128k "${output}"`)
}

export function convertmp4tomp3(input: string, output: string) {
  return execCommand(`ffmpeg -i "${input}" -vn -codec:a libmp3lame -q:a 2 "${output}"`)
}