export type IRoom = {
  id: number
  name: string
  introduction: string
  address: string
  areaName: string
  price: number
  type: string
  coverUrl?: string
  geo: string
  userId: number

  pictureUrl?: string[]
  roomBedTypeId?: number[]
}

export type IRoomData = {
  region: string
  list: IRoom[]
}
