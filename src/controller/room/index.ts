import fs from 'node:fs'

import commonService from '@/service/common'
import roomService from '@/service/room'

import { APP_HOST, APP_PORT } from '@/app/config'
import { ROOM_PICTURE_NAME } from '@/constants/table'
import { ROOM_PICTURE_PATH } from '@/constants/filepath'

import type IRoomController from './types'

const roomController: IRoomController = {
  async detail(ctx) {
    const { roomId } = ctx.params

    const data = await roomService.detail(roomId)

    ctx.body = { code: 200, data }
  },

  async review(ctx) {
    const { roomId, offset, size } = ctx.request.body

    const data = await roomService.review(roomId, String(offset), String(size))

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
