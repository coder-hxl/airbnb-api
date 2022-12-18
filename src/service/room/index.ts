import pool from '@/app/database'

import type IRoomService from './types'

const roomService: IRoomService = {
  async detail(roomId) {
    const statement = `
      SELECT
      	r.id, r.name, r.introduce, r.create_at createAt, r.update_at updateAt,
      	JSON_ARRAYAGG(rp.url) pictureUrls,
      	JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url)   landlord
      FROM room r
      LEFT JOIN room_picture rp ON rp.room_id = r.id
      LEFT JOIN user u ON u.id = r.user_id
      WHERE r.id = ?;
    `

    const [result] = await pool.execute<any>(statement, [roomId])

    return result[0]
  }
}

export default roomService
