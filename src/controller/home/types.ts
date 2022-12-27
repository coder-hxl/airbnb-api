import { Middleware } from '@koa/router'
import type { IAreaRooms, ILongfors } from '@/service/home/types'
import { AnyObject } from '@/types/commonTypes'

export interface IData<L> {
  title: string
  subtitle: string | null
  list: L
}

type IHomeControllerMiddleware<L> = Middleware<
  any,
  AnyObject,
  {
    code: number
    data: IData<L>
  }
>

export default interface IHomeController {
  wonderfulPlace: IHomeControllerMiddleware<IAreaRooms>
  hotPlace: IHomeControllerMiddleware<IAreaRooms>
  longfor: IHomeControllerMiddleware<ILongfors>
}
