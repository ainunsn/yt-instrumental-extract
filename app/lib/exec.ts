import { exec } from 'child_process'

export function execCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 * 50 }, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}