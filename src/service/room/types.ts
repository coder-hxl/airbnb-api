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

export interface IReview {
  starRating: number
  reviewCount: number
  list: {
    id: number
    comment: string
    starRating: number
    createAt: any
    user: {
      id: number
      name: string
      avatarUrl: string | null
    }
  }[]
}

export default interface IRoomService {
  detail(roomId: string): Promise<IDetailQueryRes>
  review(roomId: number, offset: string, size: string): Promise<IReview>
}
