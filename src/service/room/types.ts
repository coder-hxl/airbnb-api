export interface IDetaileRes {
  id: number
  name: string
  introduce: string
  createAt: number
  updateAt: number
  pictureUrls: string[]
  landlord: {
    id: number
    name: string
    avatarUrl: null
  }
}

export default interface IRoomService {
  detail(roomId: string): Promise<IDetaileRes>
}
