import homeService from '@/service/home'

import { IAreaRooms, ILongfors } from '@/service/home/types'
import IHomeController, { IData } from './types'

const homeController: IHomeController = {
  async wonderfulPlace(ctx) {
    const res = await homeService.wonderfulPlace()

    const data: IData<IAreaRooms> = {
      title: `探索阳江的精彩之地`,
      subtitle: null,
      list: res
    }

    ctx.body = { code: 200, data }
  },

  async hotPlace(ctx) {
    const res = await homeService.hotPlace()

    const data: IData<IAreaRooms> = {
      title: `热门目的地`,
      subtitle: '来看看颇受房客到来的地方吧',
      list: res
    }

    ctx.body = { code: 200, data }
  },

  async longfor(ctx) {
    const res = await homeService.longfor()

    const data: IData<ILongfors> = {
      title: '你可能想去',
      subtitle: '发现更多出行灵感',
      list: res
    }

    ctx.body = { code: 200, data }
  }
}

export default homeController
