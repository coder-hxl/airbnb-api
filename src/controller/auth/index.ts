import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '@/app/config'

import type IAuthController from './types'

const authController: IAuthController = {
  login(ctx) {
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 60 * 60 * 24 * 30
    })

    ctx.body = {
      code: 200,
      data: {
        id,
        name,
        token
      }
    }
  },

  test(ctx) {
    ctx.body = {
      code: 200,
      data: '授权成功~'
    }
  }
}

export default authController
