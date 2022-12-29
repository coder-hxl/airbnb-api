export interface IAreaRoom {
  id: number
  name: string
  type: string
  price: number
  coverUrl: string
  lng: number
  lat: number
  starRating: number | null
  reviewsCount: number
  bedTypes: string[]
  scoreDesc: string | null
  pictureUrls: string[]
}

interface IAreaDetail {
  list: IAreaRoom[]
  totalCount: number
}

export default interface IAreaService {
  detail(areaName: string, offset: number, size: number): Promise<IAreaDetail>
}
