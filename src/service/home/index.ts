import pool from '@/app/database'

import IHomeService, { IPlaceRes, IHomeRoom, IArea } from './types'

const homeService: IHomeService = {
  async getRoomByArea(area) {},

  async wonderfulPlace(area, deep1, deep2) {
    const statement = `
      SELECT
      	a2.id, a2.name, a2.ext_path, a2.deep,
      	(SELECT
      		JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'name', r.name,
      		'price', r.price, 'type', r.type, 'coverUrl', r.cover_url))
      	FROM room r WHERE ST_Intersects(a2.polygon, r.geo)=1) rooms
      FROM area a1
      LEFT JOIN area a2 ON a1.id = a2.pid
      WHERE a1.name = ? AND a1.deep = ? AND a2.deep = ?
      ORDER BY a2.id ASC;
    `

    const [areaRoom] = await pool.execute<any[]>(statement, [
      area,
      deep1,
      deep2
    ])

    const areaRoomMap: any = {}
    areaRoom.forEach((item) => {
      const { name, rooms } = item
      if (!rooms) return
      areaRoomMap[name] = rooms.slice(0, 6)
    })

    function extendHandle(target: IPlaceRes) {
      return new Promise<IPlaceRes>((resolve) => {
        let count = 0
        let successCount = 0

        const extendHandleRes: IPlaceRes = {}

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
  },

  async hotPlace() {
    const statement = `
      SELECT id, name, ext_path, deep, polygon
      FROM area WHERE ext_path LIKE '%江城区%' AND deep = 2;
    `

    const [areaRes] = await pool.query<any[]>(statement)
    const data: IArea = areaRes[0]

    const roomStatement = `
      SELECT * FROM room WHERE ST_Intersects(ST_GeomFromText(MULTIPOLYGON(((?))), 0), geo)=1;
    `

    console.log(data.polygon)
    try {
      await pool.execute(roomStatement, [data.polygon])
    } catch (error) {
      console.log(error)
    }

    return 'test'
  }
}

export default homeService
