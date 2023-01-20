import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import type { ResultSetHeader } from 'mysql2'
import IUserService, { IDetail } from './types'

const userService: IUserService = {
  async create(userInfo) {
    const { inserts, placeholders, values } = mapSqlStatement.create(userInfo)

    const statement = `INSERT INTO user (${inserts.join()}) VALUES (${placeholders.join()});`

    await pool.execute<ResultSetHeader>(statement, values)

    return true
  },

  async update(userId, updateInfo) {
    const { updates, values } = mapSqlStatement.update(updateInfo)
    const statement = `UPDATE user SET ${updates.join()} WHERE id = ?;`

    await pool.execute(statement, [...values, userId])

    return true
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
