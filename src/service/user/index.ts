import pool from '@/app/database'
import { filterObj } from '@/utils/filter'
import mapSqlStatement from '@/utils/mapSqlStatement'
import { USER_TABLE_CREATE, USER_TABLE_NAME } from '@/constants/table'

import type { ResultSetHeader } from 'mysql2'
import IUserService, { IDetail } from './types'

const userService: IUserService = {
  async create(userInfo) {
    const { inserts, placeholders, values } = mapSqlStatement.create(
      filterObj(userInfo, USER_TABLE_CREATE)
    )

    const statement = `INSERT INTO ${USER_TABLE_NAME} (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute<ResultSetHeader>(statement, values)

    return result
  },

  async detail(userId) {
    const statement = `
      SELECT
        id, name, nickname, cellphone, introduce,
        avatar_url avatarUrl, create_at createAt
      FROM user WHERE id = ?;
    `

    const exeRes = await pool.execute<any[]>(statement, [userId])
    const userInfo: IDetail = exeRes[0][0]

    return userInfo
  }
}

export default userService
