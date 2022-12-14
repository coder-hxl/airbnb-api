import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'

import pool from '@/app/database'
import { APP_HOST, APP_PORT } from '@/app/config'

import * as roomData from './roomData'

import type { IData } from './types'

interface ICounter {
  name: string
  expectSum: number
  saveSum: number
  discardSum: number
}

function storeToDatabase(
  filename: string,
  roomId: number,
  fileSize: number,
  counter: ICounter
) {
  // 储存到数据库
  const url = `${APP_HOST}:${APP_PORT}/api/room_picture/${roomId}/${filename}`
  const statement = `INSERT INTO room_picture (url, filename, mimetype, size, roomId) VALUES (?, ?, ?, ?, ?);`

  pool
    .execute(statement, [url, filename, 'image/jpeg', fileSize, roomId])
    .then(() => {
      const { name, expectSum, saveSum, discardSum } = counter

      console.log(
        `| ${name} | 期待: ${expectSum} | 当前: ${
          1 + saveSum + discardSum
        } | 保留: ${1 + saveSum} | 丢弃: ${discardSum}  |`
      )

      if (counter.expectSum == ++counter.saveSum + counter.discardSum) {
        console.log(`${name} 完成~`)
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

async function imgHandle(data: IData) {
  const { region, list } = data

  const counter: ICounter = {
    name: region,
    expectSum: 0,
    saveSum: 0,
    discardSum: 0
  }

  console.log(`开始下载 ${region} 房间图片~`)

  list.forEach((item) => {
    const { id } = item
    const fileDir = path.resolve(__dirname, `../upload/room/${id}`)

    if (fs.existsSync(fileDir)) return

    fs.mkdirSync(fileDir)

    item.pictureUrl.forEach((url) => {
      counter.expectSum++

      const time = new Date().getTime()
      const filename = `${time}r${id}.jpg`
      const path = `${fileDir}/${filename}`

      installImg(url, path, filename, id, counter)
    })
  })

  if (counter.expectSum === 0) {
    console.log(`无需下载 ${region} 房间图片~`)
  }
}

const keys = Object.keys(roomData)
for (const key of keys) {
  const data = roomData as any
  imgHandle(data[key])
}
