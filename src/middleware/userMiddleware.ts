import type { Middleware } from '@koa/router'
import type { IUserTable } from '@/service/tableTypes'
import { hashCrypto } from '@/utils/encryption'

export const passwordHandle: Middleware = async (ctx, next) => {
  const { password } = ctx.request.body as IUserTable

  ctx.request.body.password = hashCrypto(password)

  await next()
}
