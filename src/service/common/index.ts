import pool from '@/app/database'
import { ICommonService } from './types'

const commonService: ICommonService = {
  async query(tableName, field, value) {
    let statement = `SELECT * FROM ${tableName} `

    if (Array.isArray(field)) {
      let isFirst = true
      const wheres =
        field
          .map((item) => {
            if (isFirst) {
              isFirst = false
              return `WHERE ${item} = ?`
            } else {
              return `AND ${item} = ?`
            }
          })
          .join(' ') + ';'

      statement += wheres
    } else if (typeof field === 'string') {
      statement += `WHERE ${field} = ?;`
    } else {
      statement += ';'
    }

    const [result] = await pool.execute<any>(
      statement,
      Array.isArray(value) ? value : [value]
    )

    return result
  }
}

export default commonService
