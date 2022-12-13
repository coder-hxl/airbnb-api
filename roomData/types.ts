export type IRoom = {
  id: number
  userId: number
  name: string
  address: string
  introduce: string
  pictureUrl: string[]
  typeTabIds?: number[]
}

export type IData = {
  region: string
  list: IRoom[]
}
