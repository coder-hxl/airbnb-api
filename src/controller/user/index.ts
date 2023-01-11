import userService from '@/service/user'

import type IUserController from './types'

const userController: IUserController = {
  async create(ctx) {
    const userInfo = ctx.request.body

    const result = await userService.create(userInfo)

    ctx.body = {
      code: 200,
      data: result
    }
  },

  async detail(ctx) {
    const { userId } = ctx.params

    const userInfo = await userService.detail(userId)

    ctx.body = {
      code: 200,
      data: userInfo
    }
  }
}

export default userController
