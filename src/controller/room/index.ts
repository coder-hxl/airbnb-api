import fs from 'node:fs'

import commonService from '@/service/common'
import roomService from '@/service/room'

import { extendRoom } from '@/utils/extendRoom'
import { avatarPictureBed } from '@/utils/pictureBed'
import { APP_HOST, APP_PORT } from '@/app/config'
import { ROOM_PICTURE_NAME } from '@/constants/table'
import { ROOM_PICTURE_PATH } from '@/constants/filepath'

import type IRoomController from './types'
import { IDetailData } from './types'

const roomController: IRoomController = {
  async detail(ctx) {
    const { roomId } = ctx.params

    const {
      id,
      name,
      introduction,
      address,
      areaName,
      areaExtPath,
      price,
      type,
      coverUrl,
      geo,
      pictureUrls,
      bedTypes,
      landlord
    } = await roomService.detail(roomId)

    // 调整格式
    const data: IDetailData = {
      id,
      name,
      introduction,
      address,
      areaName,
      areaExtPath,
      price,
      type,
      coverUrl,
      lng: geo.x,
      lat: geo.y,
      pictureUrls,
      bedTypes,
      landlord,
      scoreDesc: null
    }

    extendRoom(data)

    const avatarUrl = data.landlord.avatarUrl
    if (avatarUrl) {
      data.landlord.avatarUrl = avatarPictureBed(avatarUrl)
    }

    ctx.body = { code: 200, data }
  },

  async review(ctx) {
    const { roomId, offset, size } = ctx.request.body

    const data = await roomService.review(roomId, String(offset), String(size))

    data.starRating = Number(data.starRating)
    data.list.forEach((item) => {
      const { starRating, user } = item
      item.starRating = Number(starRating)

      if (user.avatarUrl) {
        user.avatarUrl = avatarPictureBed(user.avatarUrl)
      }
    })

    ctx.body = { code: 200, data }
  },

  async picture(ctx) {
    const { roomId, filename } = ctx.params
    const url = `${APP_HOST}:${APP_PORT}/api/room/${roomId}/${ROOM_PICTURE_NAME}/${filename}`

    const results = await commonService.select(ROOM_PICTURE_NAME, { url })

    ctx.response.set('content-type', results[0].mimetype)
    ctx.body = fs.createReadStream(`${ROOM_PICTURE_PATH}/${roomId}/${filename}`)
  }
}

export default roomController
