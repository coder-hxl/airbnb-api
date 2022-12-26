import getRoomData from './crawl'
import insertRoomData from './insertRoomData'
import insertPictureData from './insertPictureData'

import examine from './examine'

import { regionURLMap } from './config'

// regionURLMap.forEach((item, index) => {
//   // 限制处理
//   if (index !== 11) return

//   getRoomData(1, item).then((res) =>
//     insertRoomData(res).then(() => insertPictureData(res))
//   )
// })

// 有些照片没下载到 upload/room 下, 需要重新下载
// 多执行几次
examine()
