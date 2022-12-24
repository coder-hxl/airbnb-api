import * as errorTypes from '@/constants/errorType'
import type { ParameterizedContext } from 'koa'

export default (error: Error, ctx: ParameterizedContext) => {
  let code, message

  switch (error.message) {
    case errorTypes.NAME_IS_EXISTS:
      code = 400
      message = '该名字已存在，请换一个吧~'
      break

    case errorTypes.CELLPHONE_IS_EXISTS:
      code = 400
      message = '该手机号已存在，请换一个吧~'
      break

    case errorTypes.NAME_OR_PASSWORD_IS_ERROR:
      code = 400
      message = '账号或密码输入错误~'
      break

    case errorTypes.UNAUTHENTICATED:
      code = 401
      message = '未授权~'
      break

    default:
      code = 404
      message = 'NOT FOUND~'
      break
  }

  ctx.status = code
  ctx.body = { code, message }
}
