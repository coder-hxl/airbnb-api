export interface IHomeRoom {
  id: number
  name: string
  type: string
  price: number
  coverUrl: string
  starRating: string | null
  reviewsCount: number
  bedTypes: string[]
  scoreDesc: string | null
  [key: string]: any
}

export interface IArea {
  id: number
  name: string
  extPath: string
  deep: number
}

export interface IAreaRoom extends IArea {
  rooms: IHomeRoom[]
}

export type IAreaRooms = IAreaRoom[]

export type ILongfors = {
  id: number
  city: string
  price: string
  pictureUrl: string
}[]

export default interface IHomeService {
  getRoomByArea(areas: IArea[]): Promise<IAreaRooms>
  wonderfulPlace(): Promise<IAreaRooms>
  hotPlace(): Promise<IAreaRooms>
  longfor(): Promise<ILongfors>
}
