import getRoomAndPictureData from './crawl/crawlRoomAndPicture'
import getRoomReviewData from './crawl/crawlRoomReview'
import insertRoomData from './insert/insertRoomData'
import insertPictureData from './insert/insertPictureData'

import examine from './other/examine'

import { roomPictureHandle, areaPictureHandle } from './other/pictureHandle'

import { regionURLMap } from './config'

// ================ 1 ================
// regionURLMap.forEach((item, index) => {
//   // 限制处理
//   if (index !== 11) return

//   getRoomAndPictureData(1, item).then((res) =>
//     insertRoomData(res).then(() => insertPictureData(res))
//   )
// })

// ================ 2 ================
// 有些照片没下载到 upload/room 下, 需要重新下载 (多执行几次)
// examine()

// ================ 3 ================
// 将数据库中图片的假数据删掉
// roomPictureHandle()

// areaPictureHandle()

// ================ 4 ================
getRoomReviewData()
