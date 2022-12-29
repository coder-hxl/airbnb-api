import { Middleware } from '@koa/router'
import type { IAreaRoom, IAreaRooms, ILongFors } from '@/service/home/types'
import { AnyObject } from '@/types/commonTypes'

export interface IDataV1<L = any> {
  title: string
  subtitle: string | null
  type: string
  list: L
}

export interface IDataV2<R = any> {
  title: string
  subtitle: string | null
  type: string
  areaRoom: R
}

type IHomeControllerMiddleware<D = any> = Middleware<
  any,
  AnyObject,
  {
    code: number
    data: D
  }
>

export default interface IHomeController {
  wonderfulPlace: IHomeControllerMiddleware<IDataV1<IAreaRooms>>
  hotPlace: IHomeControllerMiddleware<IDataV1<IAreaRooms>>
  longFor: IHomeControllerMiddleware<IDataV1<ILongFors>>
  highScore: IHomeControllerMiddleware<IDataV2<IAreaRoom>>
  goodPrice: IHomeControllerMiddleware<IDataV2<IAreaRoom>>
  plus: IHomeControllerMiddleware<IDataV2<IAreaRoom>>
}
