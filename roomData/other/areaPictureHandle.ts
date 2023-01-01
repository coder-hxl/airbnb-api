import fs from 'node:fs'
import path from 'node:path'

import pool from '@/app/database'

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
