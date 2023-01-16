import jwt from 'jsonwebtoken'

import commonService from '@/service/common/index'
import { hashCrypto } from '@/utils/encryption'

import { PUBLIC_KEY } from '@/app/config'
import { USER_TABLE_NAME } from '@/constants/table'
import * as errorTypes from '@/constants/errorType'

import type { Middleware } from '@koa/router'
import type { IUserTable } from '@/service/tableTypes'

export const verifyCreateUser: Middleware = async (ctx, next) => {
  const { name, cellphone } = ctx.request.body as IUserTable
  // 1.验证 用户名 是否存在
  const nameResult = await commonService.select(USER_TABLE_NAME, {
    name
  })
  if (nameResult.length) {
    return ctx.app.emit('error', new Error(errorTypes.NAME_IS_EXISTS), ctx)
  }

  // 2.验证 手机号 是否存在
  const cellphoneResult = await commonService.select(USER_TABLE_NAME, {
    cellphone
  })
  if (cellphoneResult.length) {
    return ctx.app.emit('error', new Error(errorTypes.CELLPHONE_IS_EXISTS), ctx)
  }

  await next()
}

export const verifyLogin: Middleware = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 验证账号和密码是否正确
  const [user] = await commonService.select<IUserTable>(USER_TABLE_NAME, {
    name,
    password: hashCrypto(password)
  })

  if (!Object.keys(user).length) {
    return ctx.app.emit(
      'error',
      new Error(errorTypes.NAME_OR_PASSWORD_IS_ERROR),
      ctx
    )
  }

  ctx.user = { id: user.id, name: user.name }

  await next()
}

export const verifyAuth: Middleware = async (ctx, next) => {
  const token = ctx.header.authorization?.replace('Bearer ', '')

  if (!token) {
    return ctx.app.emit('error', new Error(errorTypes.UNAUTHENTICATED), ctx)
  }

  try {
    const user = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
    ctx.user = user
  } catch (error) {
    return ctx.app.emit('error', new Error(errorTypes.UNAUTHENTICATED), ctx)
  }

  await next()
}

export const verifyIsOwner: Middleware = async (ctx, next) => {
  const { userId } = ctx.params
  const token = ctx.header.authorization?.replace('Bearer ', '')

  if (!token) {
    ctx.isOwner = false

    return await next()
  }

  try {
    const user: any = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
    ctx.isOwner = userId == user.id
  } catch {
    ctx.isOwner = false
  }

  await next()
}
