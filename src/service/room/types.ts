export interface IDetailStatement {
  rootStatement: string
  pictureUrlStatement: string
  bedTypeStatement: string
  reviewStatement: string
  [key: string]: string
}

export interface IDetailCommonRes extends Object {
  id: number
  name: string
  introduction: string
  address: string
  areaName: string
  areaExtPath: string
  price: number
  type: string
  coverUrl: string
  starRating: string | null
  reviewsCount: number
  reviews:
    | {
        id: number
        comment: string
        starRating: number
        user: {
          id: number
          name: string
          avatarUrl?: string
        }
      }[]
    | null
  pictureUrls: string[]
  bedTypes: string[]
  landlord: {
    id: number
    name: string
    avatarUrl: string | null
  }
}

export interface IDetailQueryRes extends IDetailCommonRes {
  geo: {
    x: number
    y: number
  }
}

export interface IDetailRes extends IDetailCommonRes {
  lng: number
  lat: number
  scoreDesc: string | null
}

export default interface IRoomService {
  detail(roomId: string): Promise<IDetailRes>
}
