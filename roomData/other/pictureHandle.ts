import fs from 'node:fs'
import path from 'node:path'

import pool from '@/app/database'

export default async function pictureHandle() {
  const rootPath = path.resolve(__dirname, '../../upload/room')
  const hasFilename: string[] = []

  const roomNames = fs.readdirSync(rootPath)

  for (const roomName of roomNames) {
    const roomPath = path.resolve(rootPath, roomName)
    const pictureNames = fs.readdirSync(roomPath)
    hasFilename.push(...pictureNames)
  }

  const [result] = await pool.execute<any[]>('SELECT * FROM room_picture;')

  const deleteExe: Promise<any>[] = []
  const filenames: string[] = []

  for (const item of result) {
    const { id, filename } = item

    if (!hasFilename.includes(filename)) {
      // 虚假数据
      deleteExe.push(
        pool.execute('DELETE FROM room_picture WHERE id = ?;', [id])
      )
    } else if (filenames.includes(filename)) {
      // 重复数据
      deleteExe.push(
        pool.execute('DELETE FROM room_picture WHERE id = ?;', [id])
      )
    } else {
      filenames.push(filename)
    }
  }

  Promise.all(deleteExe).then(() => {
    console.log('完成~')
    console.log(hasFilename.length, result.length)
  })
}
