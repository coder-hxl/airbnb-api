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

export interface IPlaceRes {
  [key: string]: IHomeRoom[]
}

export interface IArea {
  id: number
  name: string
  extPath: string
  polygon: any
}

export default interface IHomeService {
  getRoomByArea(area: IArea[]): Promise<any>
  wonderfulPlace(area: string, deep1: number, deep2: number): Promise<IPlaceRes>
  hotPlace(): Promise<any>
}
