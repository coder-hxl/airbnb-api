import homeService from '@/service/home'

import { extendRoom } from '@/utils/extendRoom'

import IHomeController from './types'

const homeController: IHomeController = {
  async hotRecommendDest(ctx) {
    const data = await homeService.hotRecommendDest()

    for (const key in data) {
      for (const room of data[key]) {
        extendRoom(room)
      }
    }

    ctx.body = { code: 200, data }
  }
}

export default homeController
