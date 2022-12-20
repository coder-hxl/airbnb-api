export interface IDetailStatement {
  rootStatement: string
  pictureUrlStatement: string
  typeTabStatement: string
  reviewStatement: string
  [key: string]: string
}

export interface IDetailQueryRes extends Object {
  id: number
  name: string
  introduce: string
  address: string
  price: number
  starRating: string
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
  pictureUrls: string[] | null
  typeTabs: string[]
  landlord: {
    id: number
    name: string
    avatarUrl: string | null
  }
}

export interface IDetailRes extends IDetailQueryRes {
  info: {
    content: string
    contentColor: string
    fontSize: string
  } | null
}

export default interface IRoomService {
  detail(roomId: string): Promise<IDetailRes>
}
