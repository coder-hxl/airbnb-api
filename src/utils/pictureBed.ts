import { USE_GITHUB_REP } from '@/app/config'
import {
  GITHUB_AREA_PICTURE,
  GITHUB_AVATAR_PICTURE,
  GITHUB_ROOM_PICTURE
} from '@/constants/filepath'

// 使用 github 图床

export function roomPictureBed<T extends string | string[]>(
  id: number,
  pictureUrl: T
) {
  if (!USE_GITHUB_REP) return pictureUrl

  let res: T

  const getPictureBed = (url: string) => {
    const filename = url.split('/room_picture/')[1]
    return `${GITHUB_ROOM_PICTURE}/${id}/${filename}`
  }

  if (Array.isArray(pictureUrl)) {
    res = pictureUrl.map(getPictureBed) as T
  } else {
    res = getPictureBed(pictureUrl) as T
  }

  return res
}

export function areaPictureBed(pictureUrl: string) {
  if (!USE_GITHUB_REP) return pictureUrl

  const filename = pictureUrl.split('/picture/').pop()
  return `${GITHUB_AREA_PICTURE}/${filename}`
}

export function avatarPictureBed(avatarUrl: string) {
  if (!USE_GITHUB_REP) return avatarUrl

  const filename = avatarUrl.split('/avatar/').pop()
  return `${GITHUB_AVATAR_PICTURE}/${filename}`
}
