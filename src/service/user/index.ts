import pool from '@/app/database'
import { filterObj } from '@/utils/filter'
import mapSqlStatement from '@/utils/mapSqlStatement'
import { USER_TABLE_CREATE, USER_TABLE_NAME } from '@/constants/table'

import type { ResultSetHeader } from 'mysql2'
import type IUserService from './types'

const userService: IUserService = {
  async create(userInfo) {
    const { inserts, placeholders, values } = mapSqlStatement.create(
      filterObj(userInfo, USER_TABLE_CREATE)
    )

    const statement = `INSERT INTO ${USER_TABLE_NAME} (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute<ResultSetHeader>(statement, values)

    return result
  }
}

export default userService
