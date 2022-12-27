import type { ReadStream } from 'fs'
import type { IControllerMiddleware } from '../types'

export default interface IAreaController {
  picture: IControllerMiddleware<
    any,
    { params: { areaId: string; filename: string } },
    ReadStream
  >
}
