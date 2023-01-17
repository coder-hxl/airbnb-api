import { ReadStream } from 'node:fs'
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
  avatarInfo: IControllerMiddleware<
    any,
    { params: { userId: string; filename: string } },
    ReadStream
  >
}
