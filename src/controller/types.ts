import { DefaultState, DefaultContext } from 'koa'
import { Middleware } from '@koa/router'

export type IControllerMiddleware<
  S = DefaultState,
  C = DefaultContext
> = Middleware<
  S,
  C,
  {
    code: number
    data: any
  }
>

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
  C extends IAuth = DefaultContext & IAuth
> = Middleware<
  S,
  C,
  {
    code: number
    data: any
  }
>
