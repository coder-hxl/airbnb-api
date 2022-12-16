import { DefaultState, DefaultContext } from 'koa'
import { Middleware } from '@koa/router'

interface IDefaultBody {
  code: number
  data: any
}

export type IControllerMiddleware<
  S = DefaultState,
  C = DefaultContext,
  D = IDefaultBody
> = Middleware<S, C, D>

interface IAuth extends Object {
  user: {
    id: number
    name: string
    iat: number
    exp: number
  }
}

export type IAuthMiddleware<
  S = DefaultState,
  C extends IAuth = DefaultContext & IAuth,
  D = IDefaultBody
> = Middleware<S, C, D>
