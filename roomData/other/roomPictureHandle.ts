import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'

import pool from '@/app/database'
import { APP_HOST, APP_PORT } from '@/app/config'

import type { IRoomData } from '../types'

interface ICounter {
  name: string
  expectSum: number
  saveSum: number
  discardSum: number
}

export async function insertRoomPictureData(data: IRoomData) {
  const notCoverIds: { id: number; hasCouver: boolean }[] = []
  function storeToDatabase(
    filename: string,
    roomId: number,
    fileSize: number,
    counter: ICounter
  ) {
    // 储存到数据库
    const url = `${APP_HOST}:${APP_PORT}/api/room/${roomId}/room_picture/${filename}`

    notCoverIds.forEach((item) => {
      if (item.id == roomId && !item.hasCouver) {
        item.hasCouver = true

        const roomStatment = `UPDATE room SET cover_url = ? WHERE id = ?;`
        pool.execute(roomStatment, [url, roomId])
      }
    })

    const statement = `INSERT INTO room_picture (url, filename, mimetype, size, room_id) VALUES (?, ?, ?, ?, ?);`

    pool
      .execute(statement, [url, filename, 'image/jpeg', fileSize, roomId])
      .then(() => {
        const { name, expectSum, discardSum } = counter

        if (expectSum == ++counter.saveSum + discardSum) {
          console.log(`${name} 完成~`)
          console.log(
            `| ${name} | 期待: ${expectSum} | 当前: ${
              counter.saveSum + discardSum
            } | 保留: ${counter.saveSum} | 丢弃: ${discardSum}  |`
          )
        }
      })
  }

  const agent = new https.Agent({ keepAlive: true })
  function installImg(
    url: string,
    storePath: string,
    filename: string,
    roomId: number,
    counter: ICounter
  ) {
    const getRes = https.get(url, { agent }, (res) => {
      const content: Buffer[] = []

      counter.expectSum++

      res.on('data', (d) => content.push(d))

      res.on('end', () => {
        const buffer = Buffer.concat(content)
        const size = buffer.byteLength

        // 图片超出 1MB 就不保存
        if (size > 1024000) {
          counter.discardSum++
          return
        }

        fs.writeFile(storePath, buffer, () =>
          storeToDatabase(filename, roomId, size, counter)
        )
      })
    })

    getRes.on('error', async (err: any) => {
      console.log(getRes.reusedSocket, err.code)
      if (getRes.reusedSocket && err.code == 'ECONNRESET') {
        installImg(url, storePath, filename, roomId, counter)
      } else {
        counter.discardSum++
      }
    })
  }

  const { region, list } = data
  const counter: ICounter = {
    name: region,
    expectSum: 0,
    saveSum: 0,
    discardSum: 0
  }
  let isReq = false

  console.log(`开始下载 ${region} 房间图片~`)

  const roomRes = await pool.execute('SELECT * FROM room;')
  const rooms = roomRes[0] as any[]
  rooms.forEach((item) => {
    notCoverIds.push({
      id: item.id,
      hasCouver: !!item.cover_url
    })
  })

  list.forEach((item) => {
    const { id } = item
    const fileDir = path.resolve(__dirname, `../upload/room/${id}`)

    if (fs.existsSync(fileDir)) return

    isReq = true
    fs.mkdirSync(fileDir)

    item.pictureUrl?.forEach((url) => {
      const time = new Date().getTime()
      const filename = `${time}r${id}.jpg`
      const path = `${fileDir}/${filename}`

      installImg(url, path, filename, id, counter)
    })
  })

  if (!isReq) {
    console.log(`无需下载 ${region} 房间图片~`)
  }
}

export async function invalidRoomPictureHandle() {
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
