import pool from '@/app/database'

import IRoomService, { IDetailQueryRes } from './types'

const roomService: IRoomService = {
  async detail(roomId) {
    const statementObj = {
      rootStatement: `
        SELECT
          r.id, r.name, r.introduction, r.address, r.area_name areaName, r.price, r.type, r.cover_url coverUrl, r.geo,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) landlord,
          (SELECT ext_path FROM area WHERE ST_Intersects(polygon, r.geo)=1 AND deep = 2) areaExtPath
        FROM room r
        LEFT JOIN user u ON u.id = r.user_id
        WHERE r.id = ?;
      `,

      pictureUrlStatement: `
        SELECT JSON_ARRAYAGG(url) pictureUrls
        FROM room_picture WHERE room_id = ?;
      `,

      bedTypeStatement: `
        SELECT JSON_ARRAYAGG(rbt.name) bedTypes
        FROM room_room_bed_type rrbt
        LEFT JOIN room_bed_type rbt ON rbt.id = rrbt.bed_id
        WHERE rrbt.room_id = ?;
      `
    }

    const executes = Object.values(statementObj).map((item) =>
      pool.execute<any[]>(item, [roomId]).then((res) => res[0][0])
    )

    const res: IDetailQueryRes = await Promise.all(executes).then((res) =>
      res.reduce((pre, value) => {
        return { ...pre, ...value }
      }, {})
    )

    return res
  },

  async review(roomId, offset, size) {
    const countStatement = `
      SELECT
        ROUND(AVG(star_rating), 1) starRating, COUNT(*) reviewCount
      FROM room_review
      WHERE room_id = ?;
    `

    const listStatement = `
      SELECT
        rr.id, rr.star_rating starRating, rr.comment, rr.create_at createAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user
      FROM room_review rr
      LEFT JOIN user u ON u.id = rr.user_id
      WHERE rr.room_id = ?
      LIMIT ?, ?;
    `

    const countPromise = pool
      .execute<any[]>(countStatement, [roomId])
      .then((res) => res[0][0])

    const listPromise = pool
      .execute<any[]>(listStatement, [roomId, offset, size])
      .then((res) => res[0])

    const [count, list] = await Promise.all([countPromise, listPromise])

    return {
      ...count,
      list
    }
  }
}

export default roomService
