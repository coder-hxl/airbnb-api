export interface IDetailRes {
  id: number
  name: string
  introduce: string
  address: string
  pictureUrls?: string[]
  typeTab: string[]
  landlord: {
    id: number
    name: string
    avatarUrl?: string
  }
  reviews?: {
    id: number
    comment: string
    starRating: number
    user: {
      id: number
      name: string
      avatarUrl?: string
    }
  }[]
}

export interface IDetailStatement {
  rootStatement: string
  pictureUrlStatement: string
  typeTabStatement: string
  reviewStatement: string
  [key: string]: string
}

export default interface IRoomService {
  detail(roomId: string): Promise<IDetailRes>
}
