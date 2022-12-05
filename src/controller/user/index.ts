import userService from '@/service/user'

import type IUserController from './types'

const userController: IUserController = {
  async create(ctx) {
    const userInfo = ctx.request.body

    const result = await userService.create(userInfo)

    ctx.body = result
  }
}

export default userController
