import pool from '@/app/database'

import type IRoomService from './types'

const roomService: IRoomService = {
  async detail(roomId) {
    const statement = `
      SELECT
      	r.id, r.name, r.introduce, r.createAt, r.updateAt,
      	JSON_ARRAYAGG(rp.url) pictureUrls,
      	JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatarUrl)   landlord
      FROM room r
      LEFT JOIN room_picture rp ON rp.roomId = r.id
      LEFT JOIN user u ON u.id = r.userId
      WHERE r.id = ?;
    `

    const [result] = await pool.execute<any>(statement, [roomId])

    return result[0]
  }
}

export default roomService
