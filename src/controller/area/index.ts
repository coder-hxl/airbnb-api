import fs from 'node:fs'

import commonService from '@/service/common'

import { APP_HOST, APP_PORT } from '@/app/config'
import { AREA_PICTURE_PATH } from '@/constants/filepath'

import areaService from '@/service/area'

import IAreaController from './types'

const areaController: IAreaController = {
  async picture(ctx) {
    const { areaId, filename } = ctx.params
    const url = `${APP_HOST}:${APP_PORT}/api/area/${areaId}/picture/${filename}`

    const results = await commonService.select('area_picture', { url })

    ctx.response.set('content-type', results[0].mimetype)
    ctx.body = fs.createReadStream(`${AREA_PICTURE_PATH}/${filename}`)
  },

  async detail(ctx) {
    const { areaName } = ctx.params
    const { offset, size } = ctx.request.body

    const data = await areaService.detail(areaName, offset, size)

    ctx.body = { code: 200, data }
  }
}

export default areaController
