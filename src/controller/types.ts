import { DefaultState, DefaultContext } from 'koa'
import { Middleware } from '@koa/router'

export type IControllerMiddleware = Middleware<
  DefaultState,
  DefaultContext,
  {
    code: number
    data: any
  }
>
