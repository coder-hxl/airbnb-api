import pool from '@/app/database'
import { extendRoom } from '@/utils/extendRoom'

import IAreaService, { IAreaRoom } from './types'

const areaService: IAreaService = {
  async detail(areaName, type, offset, size) {
    let roomOption: string | null = null
    if (type == 'highScore') {
      roomOption = 'is_high_score = 1'
    } else if (type == 'goodPrice') {
      roomOption = 'is_good_price = 1'
    } else if (type === 'plus') {
      roomOption = 'is_plus = 1'
    }

    const roomStatement = `
      SELECT
      	id, name, price, type, cover_url coverUrl, geo
      FROM room
      WHERE
        ST_Intersects((SELECT polygon FROM area WHERE name = ?), geo) = 1
        ${roomOption ? `AND ${roomOption}` : ''}
      LIMIT ?, ?;
    `
    const totalCountStatement = `
      SELECT
      	COUNT(*) totalCount
      FROM room
      WHERE
        ST_Intersects((SELECT polygon FROM area WHERE name = ?), geo) = 1
        ${roomOption ? `AND ${roomOption}` : ''}
    `

    const getAreaRoom = pool
      .execute<any[]>(roomStatement, [areaName, String(offset), String(size)])
      .then(async ([roomsRes]) => {
        const extendExe: Promise<any>[] = []
        for (const room of roomsRes) {
          const { id } = room

          const pictureStatement = `
            SELECT JSON_ARRAYAGG(url) pictureUrls
            FROM room_picture WHERE room_id =?;
          `

          const reviewStatment = `
            SELECT
        	    ROUND(AVG(r.star_rating), 1) starRating, COUNT(*) reviewsCount
            FROM room_review r
            LEFT JOIN user u ON r.user_id = u.id
            WHERE room_id = ?;
          `

          const bedStatment = `
            SELECT JSON_ARRAYAGG(rbt.name) bedTypes
            FROM room_room_bed_type rrbt
            LEFT JOIN room_bed_type rbt ON rbt.id = rrbt.bed_id
            WHERE rrbt.room_id = ?;
          `

          extendExe.push(
            pool.execute(pictureStatement, [id]),
            pool.execute(reviewStatment, [id]),
            pool.execute(bedStatment, [id])
          )
        }

        const pictureExeRes = await Promise.all(extendExe)

        let i = 0
        const res = roomsRes.map((room) => {
          const { id, name, price, type, coverUrl, geo } = room
          const lng = geo.y
          const lat = geo.x
          const { pictureUrls } = pictureExeRes[i][0][0]
          const { starRating, reviewsCount } = pictureExeRes[i + 1][0][0]
          const { bedTypes } = pictureExeRes[i + 2][0][0]

          i += 3

          const roomRes: IAreaRoom = {
            id,
            name,
            price,
            type,
            coverUrl,
            lng,
            lat,
            starRating,
            reviewsCount,
            bedTypes,
            scoreDesc: null,
            pictureUrls
          }

          extendRoom(roomRes)

          return roomRes
        })

        return res
      })

    const getTotalCount = pool
      .execute<any[]>(totalCountStatement, [areaName])
      .then((totalCountExeRes) => {
        return totalCountExeRes[0][0].totalCount
      })

    const res = await Promise.all([getAreaRoom, getTotalCount])

    const [list, totalCount] = res

    return { list, totalCount }
  }
}

export default areaService
