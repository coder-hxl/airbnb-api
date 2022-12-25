import homeService from '@/service/home'

import IHomeController, { IData } from './types'

const homeController: IHomeController = {
  async wonderfulPlace(ctx) {
    const res = await homeService.wonderfulPlace()

    const data: IData = {
      title: `探索阳江的精彩之地`,
      subtitle: null,
      destList: res
    }

    ctx.body = { code: 200, data }
  },

  async hotPlace(ctx) {
    const res = await homeService.hotPlace()

    const data: IData = {
      title: `热门目的地`,
      subtitle: '来看看颇受房客到来的地方吧',
      destList: res
    }

    ctx.body = { code: 200, data }
  }
}

export default homeController
