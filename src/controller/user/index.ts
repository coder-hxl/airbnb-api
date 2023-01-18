import fs from 'node:fs'

import userService from '@/service/user'
import commonService from '@/service/common'
import { AVATAR_PATCH } from '@/constants/filepath'

import type IUserController from './types'
import { IUserOptions } from './types'
import { avatarPictureBed } from '@/utils/pictureBed'

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
    const isOwner = ctx.isOwner

    const userInfo = await userService.detail(userId)
    const options: IUserOptions = { isOwner }

    // 使用 github 图床
    if (userInfo.avatarUrl) {
      userInfo.avatarUrl = avatarPictureBed(userInfo.avatarUrl)
    }

    ctx.body = {
      code: 200,
      data: { userInfo, options }
    }
  },

  async avatarInfo(ctx) {
    const { filename } = ctx.params
    const url = ctx.href

    const results = await commonService.select('avatar', { url })

    ctx.response.set('content-type', results[0].mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATCH}/${filename}`)
  }
}

export default userController
