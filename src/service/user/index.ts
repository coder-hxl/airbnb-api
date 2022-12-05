import pool from '@/app/database'

import type { ResultSetHeader } from 'mysql2'
import IUserService from './types'

const userService: IUserService = {
  async create({ name, password, cellphone, introduction, avatarUrl }) {
    const values = [name, password, cellphone, introduction, avatarUrl]

    const statement = `INSERT INTO user (name, password, cellphone, introduction, avatarUrl) VALUES (?, ?, ?, ?, ?);`

    const [result] = await pool.execute<ResultSetHeader>(statement, values)

    return result
  }
}

export default userService
