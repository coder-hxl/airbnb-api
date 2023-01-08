import type { ReadStream } from 'fs'
import type { IControllerMiddleware } from '../types'

export default interface IRoomController {
  detail: IControllerMiddleware<any, { params: { roomId: string } }>
  review: IControllerMiddleware
  picture: IControllerMiddleware<
    any,
    { params: { roomId: string; filename: string } },
    ReadStream
  >
}
