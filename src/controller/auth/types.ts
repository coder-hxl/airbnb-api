import { IAuthMiddleware, IControllerMiddleware } from '../types'

export default interface IAuthController {
  login: IControllerMiddleware<any, { user: { id: number; name: string } }>
  test: IAuthMiddleware
}
