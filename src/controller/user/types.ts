import { IControllerMiddleware } from '../types'

export default interface IUserController {
  create: IControllerMiddleware
  detail: IControllerMiddleware<any, { params: { userId: string } }>
}
