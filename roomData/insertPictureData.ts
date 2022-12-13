import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'

import pool from '@/app/database'
import { APP_HOST, APP_PORT } from '@/app/config'

import * as roomData from './roomData'

import type { IData } from './types'

interface ICounter {
  sum: number
  current: number
}

function storeToDatabase(
  storePath: string,
  filename: string,
  roomId: number,
  region: string,
  counter: ICounter
) {
  // 储存到数据库
  fs.stat(storePath, (err, res) => {
    const { size } = res
    const url = `${APP_HOST}:${APP_PORT}/api/room_picture/${roomId}/${filename}`
    const statement = `INSERT INTO room_picture (url, filename, mimetype, size, roomId) VALUES (?, ?, ?, ?, ?);`

    pool
      .execute(statement, [url, filename, 'image/jpeg', size, roomId])
      .then(() => {
        if (counter.sum === ++counter.current) console.log(`${region} 完成~`)
      })
  })
}

function installImg(
  url: string,
  storePath: string,
  filename: string,
  roomId: number,
  region: string,
  counter: ICounter
) {
  https
    .get(url, (res) => {
      const content: Buffer[] = []
      res.on('data', (d) => content.push(d))

      res.on('end', () => {
        const buffer = Buffer.concat(content)
        fs.writeFile(storePath, buffer, () =>
          storeToDatabase(storePath, filename, roomId, region, counter)
        )
      })
    })
    .on('error', (err) => console.log(err.message))
}

async function imgHandle(data: IData) {
  const { region, list } = data
  const counter: ICounter = { sum: 0, current: 0 }
  let notReq = true
  console.log(`开始 ${region} 地区的图片下载~`)

  list.forEach((item) => {
    const { id } = item
    const fileDir = path.resolve(__dirname, `../upload/room/${id}`)

    if (fs.existsSync(fileDir)) return

    notReq = false
    fs.mkdirSync(fileDir)

    item.pictureUrl.forEach((url) => {
      counter.sum++

      const time = new Date().getTime()
      const filename = `${time}r${id}.jpg`
      const path = `${fileDir}/${filename}`

      installImg(url, path, filename, id, region, counter)
    })
  })

  notReq && console.log(`${region} 完成~`)
}

const keys = Object.keys(roomData)
for (const key of keys) {
  const data = roomData as any
  imgHandle(data[key])
}
