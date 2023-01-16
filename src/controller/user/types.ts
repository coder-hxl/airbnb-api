import { IControllerMiddleware } from '../types'

export interface IUserOptions {
  isOwner?: boolean
}

export default interface IUserController {
  create: IControllerMiddleware
  detail: IControllerMiddleware<
    any,
    { params: { userId: string }; isOwner: boolean }
  >
}
