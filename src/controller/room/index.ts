import fs from 'fs'

import commonService from '@/service/common/index'
import { APP_HOST, APP_PORT } from '@/app/config'
import { ROOM_PICTURE_NAME } from '@/constants/table'

import type { IRoomController } from './types'
import { ROOM_PICTURE_PATH } from '@/constants/filepath'

const roomController: IRoomController = {
  async picture(ctx) {
    const { roomId, filename } = ctx.params
    const url = `${APP_HOST}:${APP_PORT}/api/${ROOM_PICTURE_NAME}/${roomId}/${filename}`

    const results = await commonService.select(ROOM_PICTURE_NAME, { url })

    ctx.response.set('content-type', results[0].mimetype)
    ctx.body = fs.createReadStream(`${ROOM_PICTURE_PATH}/${roomId}/${filename}`)
  }
}

export default roomController
