import { Middleware } from '@koa/router'
import type { IAreaRooms } from '@/service/home/types'
import { AnyObject } from '@/types/commonTypes'

export interface IData {
  title: string
  subtitle: string | null
  destList: IAreaRooms
}

type IHomeControllerMiddleware = Middleware<
  any,
  AnyObject,
  {
    code: number
    data: IData
  }
>

export default interface IHomeController {
  wonderfulPlace: IHomeControllerMiddleware
  hotPlace: IHomeControllerMiddleware
}
