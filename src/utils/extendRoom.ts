import { USE_GITHUB_REP } from '@/app/config'
import { GITHUB_ROOM_PICTURE } from '@/constants/filepath'

interface IRoom {
  id: number
  coverUrl: string
  pictureUrls?: string[]
  reviewsCount: number
  starRating: string | null
  scoreDesc: string | null
}

export function extendRoom(room: IRoom) {
  // 是否使用 github 图床, 默认使用
  if (USE_GITHUB_REP == 'true') {
    const { id, coverUrl } = room

    const changUrl = (url: string) => {
      const filename = url.split('/room_picture/')[1]
      return `${GITHUB_ROOM_PICTURE}/${id}/${filename}`
    }

    room.coverUrl = changUrl(coverUrl)

    if (room.pictureUrls) {
      room.pictureUrls = room.pictureUrls.map(changUrl)
    }
  }

  // 是否满足超赞条件
  if (room.reviewsCount >= 2 && Number(room.starRating) >= 4.5) {
    room.scoreDesc = '超赞房东'
  }
}
