import fs from 'node:fs'
import path from 'node:path'

import pool from '@/app/database'

export async function roomPictureHandle() {
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

export function areaPictureHandle() {
  const targetPath = path.resolve(__dirname, '../../upload/area')
  const areaFilenames = fs.readdirSync(targetPath)

  const executes: Promise<any>[] = []
  for (const item of areaFilenames) {
    const id = item.replace('.jpg', '')
    const filename = `${id}.jpg`
    const fileSize = fs.statSync(`${targetPath}/${filename}`).size
    const url = `http://localhost:9001/api/area/${id}/picture/${filename}`

    const updatePictureUrl = pool.execute(
      'UPDATE area SET picture_url = ? WHERE id = ?;',
      [url, id]
    )
    const insertPictureInfo = pool.execute(
      'INSERT INTO area_picture (url, filename, mimetype, size, area_id) VALUES (?, ?, ?, ?, ?);',
      [url, filename, 'image/jpeg', fileSize, id]
    )

    executes.push(updatePictureUrl, insertPictureInfo)
  }

  Promise.all(executes).then(() => {
    console.log('成功~')
  })
}
