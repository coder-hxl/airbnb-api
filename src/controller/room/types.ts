import type { ReadStream } from 'fs'
import type { IControllerMiddleware } from '../types'

export interface IRoomController {
  picture: IControllerMiddleware<
    any,
    { params: { roomId: string; filename: string } },
    ReadStream
  >
}
