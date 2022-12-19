import pool from '@/app/database'

import type IRoomService from './types'
import type { IDetailRes, IDetailStatement } from './types'

const roomService: IRoomService = {
  async detail(roomId) {
    const {
      id,
      name,
      introduce,
      address,
      pictureUrls,
      typeTab,
      landlord,
      reviews
    } = await new Promise<IDetailRes>((resolve) => {
      const statement: IDetailStatement = {
        rootStatement: `
        SELECT
      	  r.id, r.name, r.introduce, r.address,
      	  JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) landlord
        FROM room r
        LEFT JOIN user u ON r.user_id = u.id
        WHERE r.id = ?;
      `,
        pictureUrlStatement: `SELECT JSON_ARRAYAGG(url) pictureUrls FROM room_picture WHERE room_id = ?;`,
        typeTabStatement: `
        SELECT JSON_ARRAYAGG(rt.name) typeTabs FROM r_room_room_type_tab rrt
        LEFT JOIN room_type_tab rt ON rt.id = rrt.room_type_tab_id
        WHERE rrt.room_id = ?;
       `,
        reviewStatement: `
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT('id', r.id, 'starRating', r.star_rating, 'comment', r. comment, 'createAt', r.create_at, 'user', JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url))
        ) reviews
        FROM review r
        LEFT JOIN user u ON r.user_id = u.id
        WHERE room_id = ?;
      `
      }

      let res: IDetailRes
      let count = 0
      const length = Object.keys(statement).length

      for (const key in statement) {
        const item = statement[key]
        pool.execute(item, [roomId]).then((qRes: any) => {
          const data = qRes[0][0]
          res = { ...res, ...data }
          if (++count == length) resolve(res)
        })
      }
    })

    const res: IDetailRes = {
      id,
      name,
      introduce,
      address,
      pictureUrls,
      typeTab,
      landlord,
      reviews
    }

    return res
  }
}

export default roomService
