import type { ReadStream } from 'fs'
import { IDetailCommonRes } from '@/service/room/types'
import type { IControllerMiddleware } from '../types'

export interface IDetailData extends IDetailCommonRes {
  lng: number
  lat: number
  scoreDesc: string | null
}

export default interface IRoomController {
  detail: IControllerMiddleware<
    any,
    { params: { roomId: string } },
    { code: number; data: IDetailData }
  >
  review: IControllerMiddleware
  picture: IControllerMiddleware<
    any,
    { params: { roomId: string; filename: string } },
    ReadStream
  >
}
