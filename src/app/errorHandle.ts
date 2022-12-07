import * as errorTypes from '@/constants/errorType'
import type { ParameterizedContext } from 'koa'

export default (error: Error, ctx: ParameterizedContext) => {
  let code, data

  switch (error.message) {
    case errorTypes.NAME_IS_EXISTS:
      code = 400
      data = '该名字已存在，请换一个吧~'
      break

    case errorTypes.CELLPHONE_IS_EXISTS:
      code = 400
      data = '该手机号已存在，请换一个吧~'
      break

    case errorTypes.NAME_OR_PASSWORD_IS_ERROR:
      code = 400
      data = '账号或密码输入错误~'
      break

    case errorTypes.UNAUTHENTICATED:
      code = 401
      data = '未授权~'
      break

    default:
      code = 404
      data = 'NOT FOUND~'
      break
  }

  ctx.body = { code, data }
}
