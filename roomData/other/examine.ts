import fs from 'node:fs'
import path from 'node:path'

import pool from '@/app/database'
import { insertRoomData } from './roomHandle'
import { insertRoomPictureData } from './roomPictureHandle'

import yangjiang from '../data/yangjiang.json'
import hailingdao from '../data/hailingdao.json'
import yangdongqu from '../data/yangdongqu.json'
import guangzhou from '../data/guangzhou.json'
import shenzhen from '../data/shenzhen.json'
import foshan from '../data/foshan.json'
import zhuhai from '../data/zhuhai.json'

import chaozhou from '../data/chaozhou.json'
import jiangmen from '../data/jiangmen.json'
import maoming from '../data/maoming.json'
import qingyuan from '../data/qingyuan.json'
import zhanjiang from '../data/zhanjiang.json'

import { IRoomData } from '../types'

const examineData: any[] = [chaozhou, jiangmen, maoming, qingyuan, zhanjiang]

const targetPath = path.resolve(__dirname, '../upload/room')
const roomIds = fs.readdirSync(targetPath)

let count = 0
let deleteCount = 0

export default function examine() {
  for (const id of roomIds) {
    const picturePath = path.resolve(targetPath, id)
    const pictures = fs.readdirSync(picturePath)

    // 图片量小于两张就删掉文件夹和对应的房间数据，重新下载
    if (pictures.length <= 2) {
      count++
      console.log(id)
      fs.rmSync(picturePath, { force: true, recursive: true })
      pool.execute('DELETE FROM room WHERE id = ?;', [id]).then(() => {
        if (count == ++deleteCount) {
          console.log('检查完毕, 开始下载~')
          examineData.forEach((item: IRoomData) => {
            insertRoomData(item).then(() => insertRoomPictureData(item))
          })
        }
      })
    }
  }
}
