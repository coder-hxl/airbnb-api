import pool from '@/app/database'
import { extendRoom } from '@/utils/extendRoom'

import IRoomService, {
  IDetailQueryRes,
  IDetailStatementObj,
  IDetailRes
} from './types'

const roomService: IRoomService = {
  async detail(roomId) {
    function getAllData() {
      return new Promise<IDetailQueryRes>((resolve) => {
        const statementObj: IDetailStatementObj = {
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

        const executes: Promise<any[]>[] = []
        for (const item of Object.values(statementObj)) {
          executes.push(pool.execute(item, [roomId]))
        }

        let resolveRes: IDetailQueryRes
        Promise.all(executes).then((res) => {
          for (const item of res) {
            const value = item[0][0]
            resolveRes = { ...resolveRes, ...value }
          }

          resolve(resolveRes)
        })
      })
    }

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
    } = await getAllData()

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

    extendRoom(res)

    return res
  }
}

export default roomService
