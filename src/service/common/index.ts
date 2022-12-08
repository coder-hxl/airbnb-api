import pool from '@/app/database'
import { ICommonService } from './types'

const commonService: ICommonService = {
  async select(tableName, field = {}) {
    const keys = Object.keys(field)
    const values = Object.values(field)

    let statement = `SELECT * FROM ${tableName} `

    if (keys.length) {
      let isFirst = true
      statement += keys
        .map((key) => {
          if (isFirst) {
            isFirst = false
            return `WHERE ${key} = ?`
          } else {
            return `AND ${key} = ?`
          }
        })
        .join(' ')
    }

    statement += ';'

    const [result] = await pool.execute<any>(statement, values)

    return result
  }
}

export default commonService
