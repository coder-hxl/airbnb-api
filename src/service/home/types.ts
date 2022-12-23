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

export interface IHotRecommendDestRes {
  [key: string]: IHomeRoom[]
}

export default interface IHomeService {
  hotRecommendDest(): Promise<IHotRecommendDestRes>
}
