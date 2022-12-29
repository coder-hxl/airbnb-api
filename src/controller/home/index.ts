import homeService from '@/service/home'

import { IAreaRooms, ILongFors } from '@/service/home/types'
import IHomeController, { IDataV1, IDataV2 } from './types'

const homeController: IHomeController = {
  async wonderfulPlace(ctx) {
    const res = await homeService.wonderfulPlace()

    const data: IDataV1<IAreaRooms> = {
      title: `探索阳江的精彩之地`,
      subtitle: null,
      type: 'wonderfulPlace',
      list: res
    }

    ctx.body = { code: 200, data }
  },

  async hotPlace(ctx) {
    const res = await homeService.hotPlace()

    const data: IDataV1<IAreaRooms> = {
      title: `热门目的地`,
      subtitle: '来看看颇受房客到来的地方吧',
      type: 'hotPlace',
      list: res
    }

    ctx.body = { code: 200, data }
  },

  async longFor(ctx) {
    const res = await homeService.longFor()

    const data: IDataV1<ILongFors> = {
      title: '你可能想去',
      subtitle: '发现更多出行灵感',
      type: 'longFor',
      list: res
    }

    ctx.body = { code: 200, data }
  },

  async highScore(ctx) {
    const res = await homeService.highScore()

    const data: IDataV2<any> = {
      title: '阳江高分好评房源',
      subtitle: '来看看这些颇受房客好评的房源吧',
      type: 'highScore',
      areaRoom: res
    }

    ctx.body = { code: 200, data }
  },

  async goodPrice(ctx) {
    const res = await homeService.goodPrice()

    const data: IDataV2<any> = {
      title: '阳江高性价比',
      subtitle: null,
      type: 'goodPrice',
      areaRoom: res
    }

    ctx.body = { code: 200, data }
  },

  async plus(ctx) {
    const res = await homeService.plus()

    const data: IDataV2<any> = {
      title: '阳江的爱彼迎Plus房源',
      subtitle: '品质和设计经过验证的房源',
      type: 'plus',
      areaRoom: res
    }

    ctx.body = { code: 200, data }
  }
}

export default homeController
