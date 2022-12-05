import type { ResultSetHeader } from 'mysql2'
import type { IUserTable } from '../tableTypes'

export default interface IUserService {
  create(userInfo: IUserTable): Promise<ResultSetHeader>
}
