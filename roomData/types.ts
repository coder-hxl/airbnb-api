export type IRoom = {
  id: number
  userId: number
  name: string
  address: string
  introduce: string
  pictureUrl?: string[]
  typeTabIds?: number[]
}

export type IRoomData = {
  region: string
  list: IRoom[]
}
