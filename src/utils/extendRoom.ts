import { roomPictureBed } from './pictureBed'

interface IRoom extends Object {
  id: number
  coverUrl: string
  pictureUrls?: string[]
  reviewsCount?: number
  starRating?: number | string | null
  scoreDesc: string | null
}

export function extendRoom(room: IRoom) {
  const { id, coverUrl, pictureUrls, starRating, reviewsCount } = room

  room.coverUrl = roomPictureBed(id, coverUrl)

  if (pictureUrls) {
    room.pictureUrls = roomPictureBed(id, pictureUrls)
  }

  if (typeof starRating != 'undefined' && typeof reviewsCount != 'undefined') {
    room.starRating = Number(starRating)
    // 是否满足超赞条件
    if (reviewsCount >= 88 && room.starRating >= 4.8) {
      room.scoreDesc = '超赞房东'
    }
  }
}
