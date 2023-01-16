import type { ResultSetHeader } from 'mysql2'
import type { IUserTable } from '../tableTypes'

export interface IDetail {
  id?: number
  name?: string
  nikename?: string | null
  cellphone?: number
  introduce?: string | null
  avatarUrl?: string | null
  createAt?: string
}

export default interface IUserService {
  create(userInfo: IUserTable): Promise<ResultSetHeader>
  detail(userId: string): Promise<IDetail>
}
