import { Middleware } from '@koa/router'

export default interface IUserController {
  create: Middleware
}
