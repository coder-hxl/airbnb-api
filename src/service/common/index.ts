import pool from '@/app/database'
import { ICommonService } from './types'

const commonService: ICommonService = {
  async query(tableName, field, value) {
    const statement = `SELECT * FROM ${tableName} WHERE ${field} = ?;`

    const [result] = await pool.execute<any>(statement, [value])

    return result
  }
}

export default commonService
