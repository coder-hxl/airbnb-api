import getRoomData from './crawl'
import insertRoomData from './insertRoomData'
import insertPictureData from './insertPictureData'

import { regionURLMap } from './config'

regionURLMap.forEach((item, index) => {
  // 请求太多容易崩
  if (index !== 0) return

  getRoomData(1, item).then((res) =>
    insertRoomData(res).then(() => insertPictureData(res))
  )
})
