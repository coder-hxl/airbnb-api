import homeService from '@/service/home'

import { extendRoom } from '@/utils/extendRoom'

import IHomeController from './types'

const homeController: IHomeController = {
  async wonderfulPlaces(ctx) {
    const data = await homeService.wonderfulPlaces()

    for (const key in data) {
      for (const room of data[key]) {
        extendRoom(room)
      }
    }

    ctx.body = { code: 200, data }
  }
}

export default homeController
