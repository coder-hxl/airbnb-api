import https from 'node:https'
import fs from 'node:fs'
import jimp from 'jimp'

import * as roomData from './roomData'

let imgCount = 0
let current = 0

function installImg(url: string, path: string) {
  https
    .get(url, (res) => {
      const content: Buffer[] = []
      res.on('data', (d) => content.push(d))

      res.on('end', () => {
        const buffer = Buffer.concat(content)
        jimp.read(buffer).then((value) => {
          value.quality(40).write(path, () => {
            if (imgCount === ++current) console.log('下载图片完成~')
          })
        })
      })
    })
    .on('error', (err) => console.log(err.message))
}

function imgHandle() {
  console.log('开始图片下载~')
  for (const item of roomData.haiLingDao.list) {
    const { id } = item
    const fileDir = './upload/room/' + id + '/'
    fs.mkdirSync(fileDir)

    item.pictureUrl.forEach((url) => {
      imgCount++
      const time = new Date().getTime()
      const filename = `${time}_r${id}.jpg`
      const path = fileDir + filename

      installImg(url, path)
    })
  }
}

imgHandle()
