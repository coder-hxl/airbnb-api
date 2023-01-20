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

export type IAuthMiddleware<
  S = DefaultState,
  C = DefaultContext,
  D = IDefaultBody
> = Middleware<
  S,
  C & {
    user: {
      id: number
      name: string
      iat: number
      exp: number
    }
  },
  D
>
