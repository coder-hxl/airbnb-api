export interface IHomeRoom {
  id: number
  name: string
  type: string
  price: number
  coverUrl: string
  starRating: number | null
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

export type ILongFors = {
  id: number
  city: string
  price: string
  pictureUrl: string
}[]

export default interface IHomeService {
  getRoomByArea(areas: IArea[], roomLength: number): Promise<IAreaRooms>
  wonderfulPlace(): Promise<IAreaRooms>
  hotPlace(): Promise<IAreaRooms>
  longFor(): Promise<ILongFors>
  highScore(): Promise<IAreaRoom>
  goodPrice(): Promise<IAreaRoom>
  plus(): Promise<IAreaRoom>
}
