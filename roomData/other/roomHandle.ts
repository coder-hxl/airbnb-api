import pool from '@/app/database'

import type { IRoom, IRoomData } from '../types'

export async function insertRoomData(data: IRoomData) {
  const hasRoomIds: number[] = []

  async function dataHandle(data: IRoomData) {
    const { list } = data

    const roomRes = await pool.execute('SELECT * FROM room;')
    const room = roomRes[0] as any[]

    room.forEach((item) => hasRoomIds.push(item.id))

    const filterRes = list.filter((item) => {
      const isHas = hasRoomIds.includes(item.id) ? true : false

      if (!isHas) hasRoomIds.push(item.id)

      return !isHas
    })

    filterRes.forEach((item) => {
      item.roomBedTypeId = [1, 2, 4]
    })

    return filterRes
  }

  function insert(list: IRoom[]) {
    const insertResult: any[] = []

    return new Promise((result) => {
      for (const item of list) {
        const {
          id,
          name,
          introduction,
          address,
          areaName,
          price,
          type,
          geo,
          userId,

          roomBedTypeId
        } = item

        const statement = `INSERT INTO room (id, name, introduction, address, area_name, price, type, geo, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ${geo}, ?);`
        pool
          .execute(statement, [
            id,
            name,
            introduction,
            address,
            areaName,
            price,
            type ?? '酒店',
            userId
          ])
          .then(() => {
            const all: Promise<any>[] = []
            const statment = `INSERT INTO room_room_bed_type (room_id, bed_id) VALUES (?, ?);`

            for (const bedId of roomBedTypeId ?? []) {
              all.push(pool.execute(statment, [id, bedId]))
            }

            return Promise.all(all)
          })
          .then(() => {
            insertResult.push(id)
            if (insertResult.length == list.length) result(insertResult)
          })
      }
    })
  }

  const { region, list } = data
  console.log(`正在插入 ${region} 数据~`)

  const filterRoomData = await dataHandle(data)

  await insert(filterRoomData)

  console.log(`插入 ${region} 数据完成, 数据总数: ${list.length}`)
}

export async function handleRoomQualityByReview() {
  const reviewsStatement = `
    SELECT
	    r.id, r.name, r.price,
	    COUNT(rr.id) reviewCount,
	    ROUND(AVG(rr.star_rating), 1) starRating
    FROM room r
    LEFT JOIN room_review rr ON r.id = rr.room_id
    GROUP BY r.id;
  `

  const [reviewsRes] = await pool.execute<any[]>(reviewsStatement)

  const executes: Promise<any>[] = []
  for (const item of reviewsRes) {
    const { id, price, reviewCount, starRating } = item

    const isHighScore = reviewCount >= 36 && starRating >= 4.8 ? 1 : 0

    const isGoodPrice =
      price <= 288 && reviewCount >= 36 && starRating >= 4.5 ? 1 : 0

    const isPlus = reviewCount >= 88 && starRating >= 4.9 ? 1 : 0

    const statement = `
      UPDATE room
      SET is_good_price = ?, is_high_score = ?, is_plus = ?
      WHERE id = ?;
    `

    executes.push(
      pool.execute(statement, [isGoodPrice, isHighScore, isPlus, id])
    )
  }

  Promise.all(executes).then(() => {
    console.log('给房间添加 isGoodPrice isHighScore isPlus 完成~')
  })
}
