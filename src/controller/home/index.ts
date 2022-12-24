import homeService from '@/service/home'

import { extendRoom } from '@/utils/extendRoom'

import IHomeController, { IData } from './types'

const homeController: IHomeController = {
  async wonderfulPlace(ctx) {
    const res = await homeService.wonderfulPlace('阳江市', 1, 2)

    for (const key in res) {
      for (const room of res[key]) {
        extendRoom(room)
      }
    }

    const data: IData = {
      title: `探索阳江的精彩之地`,
      subtitle: null,
      destList: res
    }

    ctx.body = { code: 200, data }
  },

  async hotPlace(ctx) {
    const res = await homeService.wonderfulPlace('广东省', 0, 1)

    for (const key in res) {
      for (const room of res[key]) {
        extendRoom(room)
      }
    }

    // const res = await homeService.hotPlace()

    const data: IData = {
      title: `热门目的地`,
      subtitle: null,
      destList: res
    }

    ctx.body = { code: 200, data }
  }
}

export default homeController
