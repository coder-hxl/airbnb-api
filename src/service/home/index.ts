import pool from '@/app/database'
import { extendRoom } from '@/utils/extendRoom'

import { USE_GITHUB_REP } from '@/app/config'
import { GITHUB_AREA_PICTURE } from '@/constants/filepath'

import IHomeService, { IHomeRoom, IArea, IAreaRoom, IAreaRooms } from './types'

const homeService: IHomeService = {
  getRoomByArea(areas, roomLength) {
    function areaRoomsHandle(areaRooms: IAreaRooms) {
      return new Promise<IAreaRooms>((resolve) => {
        let count = 0
        let successCount = 0

        const handleRes: IAreaRooms = []

        for (const area of areaRooms) {
          const { id, name, extPath, deep, rooms } = area

          // 调整顺序。保留内存地址, 方便添加内容
          const newArea: IAreaRoom = {
            id,
            name,
            extPath,
            deep,
            rooms: []
          }
          const newRooms = newArea.rooms

          handleRes.push(newArea)

          // 给房间扩展内容
          for (const room of rooms) {
            count++
            const { id, name, type, price, coverUrl } = room

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
                  if (key == 'starRating' && value[key] != null) {
                    newRoom[key] = Number(value[key])
                  } else {
                    newRoom[key] = value[key]
                  }
                }
              }

              extendRoom(newRoom)

              if (count == ++successCount) {
                resolve(handleRes)
              }
            })
          }
        }
      })
    }

    return new Promise((resolve) => {
      // 随机取 6 条数据
      const statement = `
        SELECT id, name, price, type, cover_url coverUrl FROM room
        WHERE
          ST_Intersects((SELECT polygon FROM area WHERE id = ?), geo) = 1
        ORDER BY RAND() LIMIT ?;
      `

      const executes: Promise<any[]>[] = []
      for (const area of areas) {
        const { id } = area
        executes.push(pool.execute(statement, [id, String(roomLength)]))
      }

      Promise.all(executes).then((exeRes) => {
        const areaRooms: IAreaRooms = []

        // 过滤数据
        areas.forEach((area, index) => {
          const { id, name, extPath, deep } = area
          // index 拿到每个地区对应的房间
          const rooms = exeRes[index][0]

          if (!rooms.length) return

          areaRooms.push({
            id,
            name,
            extPath,
            deep,
            rooms
          })
        })

        areaRoomsHandle(areaRooms).then(resolve)
      })
    })
  },

  async wonderfulPlace() {
    const areaStatement = `
      SELECT id, name, ext_path extPath, deep
      FROM area WHERE ext_path LIKE '%广东省 阳江市%' AND deep = 2;
    `

    const areaExeRes = await pool.execute<any[]>(areaStatement)
    const areaRes = areaExeRes[0] as IArea[]

    const areaRoomRes = await this.getRoomByArea(areaRes, 6)

    return areaRoomRes
  },

  async hotPlace() {
    const areaStatement = `
      SELECT id, name, ext_path extPath, deep
      FROM area WHERE ext_path LIKE '%广东省%' AND deep = 1;
    `

    const areaExeRes = await pool.execute<any[]>(areaStatement)
    const areaRes = areaExeRes[0] as IArea[]

    const areaRoomRes = await this.getRoomByArea(areaRes, 6)

    return areaRoomRes
  },

  async longFor() {
    const statement = `
      SELECT id, name city, picture_url pictureUrl
      FROM area WHERE picture_url != '';
    `

    const exeRes = await pool.execute<any[]>(statement)
    const citys: {
      id: number
      city: string
      price: number
      pictureUrl: string
    }[] = exeRes[0]

    const pricesStatement = `
      SELECT CONCAT('¥', ROUND(AVG(price), 0), '/晚') price FROM room
      WHERE ST_Intersects((SELECT polygon FROM area WHERE id = ?), geo) = 1
    `

    const executes: Promise<any>[] = []
    for (const city of citys) {
      const { id } = city
      executes.push(pool.execute(pricesStatement, [id]))
    }

    const pricesExeRes = await Promise.all(executes)
    const res = citys.map((item, index) => {
      const { id, city, pictureUrl } = item
      const { price } = pricesExeRes[index][0][0] as { price: string }

      let url = pictureUrl
      // 使用 github 图床
      if (USE_GITHUB_REP) {
        const filename = pictureUrl.split('/picture/')[1]
        url = `${GITHUB_AREA_PICTURE}/${filename}`
      }

      return { id, city, price, pictureUrl: url }
    })

    return res
  },

  async highScore() {
    const areaStatement = `
      SELECT id, name, ext_path extPath, deep
      FROM area WHERE ext_path = '广东省 阳江市';
    `

    const areaExeRes = await pool.execute<any[]>(areaStatement)
    const areas: IArea[] = areaExeRes[0]

    const areaRoomRes = await this.getRoomByArea(areas, 8)
    const res = areaRoomRes[0]

    return res
  },

  async goodPrice() {
    const areaStatement = `
      SELECT id, name, ext_path extPath, deep
      FROM area WHERE ext_path = '广东省 阳江市';
    `

    const areaExeRes = await pool.execute<any[]>(areaStatement)
    const areas: IArea[] = areaExeRes[0]

    const areaRoomRes = await this.getRoomByArea(areas, 8)
    const res = areaRoomRes[0]

    return res
  },

  async plus() {
    const areaStatement = `
      SELECT id, name, ext_path extPath, deep
      FROM area WHERE ext_path = '广东省 阳江市';
    `

    const areaExeRes = await pool.execute<any[]>(areaStatement)
    const areas: IArea[] = areaExeRes[0]

    const areaRoomRes = await this.getRoomByArea(areas, 8)
    const res = areaRoomRes[0]

    return res
  }
}

export default homeService
