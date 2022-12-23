import pool from '@/app/database'

import IRoomService, {
  IDetailQueryRes,
  IDetailStatement,
  IDetailRes
} from './types'

const roomService: IRoomService = {
  async detail(roomId) {
    const {
      id,
      name,
      introduction,
      address,
      areaName,
      areaExtPath,
      price,
      type,
      coverUrl,
      geo,
      starRating,
      reviewsCount,
      reviews,
      pictureUrls,
      bedTypes,
      landlord
    } = await new Promise<IDetailQueryRes>((resolve) => {
      const statement: IDetailStatement = {
        rootStatement: `
          SELECT
            r.id, r.name, r.introduction, r.address, r.area_name areaName, r.price, r.type, r.cover_url coverUrl, r.geo,
            JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url)  landlord,
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
       `,

        reviewStatement: `
          SELECT
        	  ROUND(AVG(r.star_rating), 1) starRating, COUNT(*) reviewsCount,
        	  JSON_ARRAYAGG(
        		  JSON_OBJECT('id', r.id, 'star_rating', r.star_rating,
        			  'comment', r.comment, 'createAt', r.create_at, 'user',
                JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url))
            ) reviews
          FROM room_review r
          LEFT JOIN user u ON r.user_id = u.id
          WHERE room_id = ?;
        `
      }

      let res: IDetailQueryRes
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

    // 调整顺序, 扩展内容
    const res: IDetailRes = {
      id,
      name,
      introduction,
      address,
      areaName,
      areaExtPath,
      price,
      type,
      coverUrl,
      lng: geo.x,
      lat: geo.y,
      starRating,
      reviewsCount,
      reviews,
      pictureUrls,
      bedTypes,
      landlord,
      scoreDesc: null
    }

    return res
  }
}

export default roomService
