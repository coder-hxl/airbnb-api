import mysql from 'mysql2'

import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} from './config'

const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT as any,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
})

pool.getConnection((err) => {
  const message = `连接 ${MYSQL_DATABASE} 数据库`
  if (err) {
    console.log(message + '失败~', err)
  } else {
    console.log(message + '成功~')
  }
})

export default pool.promise()
