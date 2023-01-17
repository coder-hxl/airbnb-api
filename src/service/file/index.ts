import pool from '@/app/database'

import IFileService from './types'

const fileService: IFileService = {
  async createAvatar(userId, url, filename, mimetype, size) {
    const createStatement = `
      INSERT INTO avatar (url, filename, mimetype, size, user_id)
      VALUES (?, ?, ?, ?, ?);
    `
    const userAvatarUrlStatement = `UPDATE user SET avatar_url = ? WHERE id = ?;`

    const avatar = pool.execute(createStatement, [
      url,
      filename,
      mimetype,
      size,
      userId
    ])
    const user = await pool.execute(userAvatarUrlStatement, [url, userId])

    let executeRes = false
    try {
      await Promise.all([avatar, user])
      executeRes = true
    } catch (error) {
      console.log(error)
    }

    return executeRes
  }
}

export default fileService
