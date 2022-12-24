import pool from '@/app/database'

import IHomeService, { IHotRecommendDestRes, IHomeRoom } from './types'

const homeService: IHomeService = {
  async hotRecommendDest() {
    const statement = `
      SELECT
      	name,
      	(SELECT
      		JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'name', r.name,
      		'price', r.price, 'type', r.type, 'coverUrl', r.cover_url))
      	FROM room r WHERE ST_Intersects(polygon, r.geo)=1) rooms
      FROM area WHERE ext_path LIKE '%阳江市%' AND deep = 2;
    `

    const [areaRoom] = await pool.execute<any[]>(statement)

    const areaRoomMap: any = {}
    areaRoom.forEach((item) => {
      const { name, rooms } = item
      areaRoomMap[name] = rooms.slice(0, 6)
    })

    function extendHandle(
      target: IHotRecommendDestRes
    ): Promise<IHotRecommendDestRes> {
      return new Promise((resolve) => {
        let count = 0
        let successCount = 0

        const extendHandleRes: IHotRecommendDestRes = {}

        for (const areaKey in target) {
          const rooms = target[areaKey]
          const newRooms: IHomeRoom[] = (extendHandleRes[areaKey] = [])

          for (const room of rooms) {
            count++
            const { id, name, type, price, coverUrl } = room

            // 调整顺序。保留内存地址, 方便添加内容
            const newRoom: IHomeRoom = {
              id,
              name,
              type,
              price,
              coverUrl,
              starRating: null,
              reviewsCount: 0,
              bedTypes: [],
              scoreDesc: null
            }
            newRooms.push(newRoom)

            const statement = {
              reviewStatement: `
                SELECT
	                ROUND(AVG(r.star_rating), 1) starRating, COUNT(*) reviewsCount
                FROM room_review r
                WHERE room_id = ?;
              `,
              bedTypeStatement: `
                SELECT JSON_ARRAYAGG(rbt.name) bedTypes
                FROM room_room_bed_type rrbt
                LEFT JOIN room_bed_type rbt ON rbt.id = rrbt.bed_id
                WHERE rrbt.room_id = ?;
              `
            }

            const executes: Promise<any>[] = []
            for (const item of Object.values(statement)) {
              executes.push(pool.execute(item, [id]))
            }

            Promise.all(executes).then((res) => {
              for (const item of res) {
                const value = item[0][0]
                for (const key in value) {
                  newRoom[key] = value[key]
                }
              }

              if (count == ++successCount) {
                resolve(extendHandleRes)
              }
            })
          }
        }
      })
    }

    const res = await extendHandle(areaRoomMap)

    return res
  }
}

export default homeService
