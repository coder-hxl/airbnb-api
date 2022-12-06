import type { Middleware } from '@koa/router'
import type { IUserTable } from '@/service/tableTypes'
import commonService from '@/service/common/index'

import { USER_TABLE_NAME } from '@/constants/table'
import * as errorTypes from '@/constants/errorType'

export const verifyCreateUser: Middleware = async (ctx, next) => {
  const { name, cellphone } = ctx.request.body as IUserTable
  // 1.验证 用户名 是否存在
  const nameResult = await commonService.query(USER_TABLE_NAME, 'name', name)
  if (nameResult.length) {
    return ctx.app.emit('error', new Error(errorTypes.NAME_IS_EXISTS), ctx)
  }

  // 2.验证 手机号 是否存在
  const cellphoneResult = await commonService.query(
    USER_TABLE_NAME,
    'cellphone',
    cellphone
  )
  if (cellphoneResult.length) {
    return ctx.app.emit('error', new Error(errorTypes.CELLPHONE_IS_EXISTS), ctx)
  }

  await next()
}
