import { ReadStream } from 'node:fs'
import { IAuthMiddleware, IControllerMiddleware } from '../types'

export interface IUserOptions {
  isOwner?: boolean
}

export default interface IUserController {
  create: IControllerMiddleware
  detail: IControllerMiddleware<
    any,
    { params: { userId: string }; isOwner: boolean }
  >
  update: IAuthMiddleware<any, { params: { userId: string } }>
  avatarInfo: IControllerMiddleware<
    any,
    { params: { userId: string; filename: string } },
    ReadStream
  >
}
