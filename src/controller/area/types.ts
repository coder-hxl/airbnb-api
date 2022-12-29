import type { ReadStream } from 'fs'
import type { IControllerMiddleware } from '../types'
import { IAreaRoom } from '@/service/area/types'

export default interface IAreaController {
  picture: IControllerMiddleware<
    any,
    { params: { areaId: string; filename: string } },
    ReadStream
  >
  detail: IControllerMiddleware<
    any,
    { params: { areaName: string } },
    { code: number; data: { list: IAreaRoom[]; totalCount: number } }
  >
}
