import pool from '@/app/database'

import type { IRoom, IRoomData } from '..//types'

// ---------------------------------

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

export default async function insertRoomData(data: IRoomData) {
  const { region, list } = data
  console.log(`正在插入 ${region} 数据~`)

  const filterRoomData = await dataHandle(data)

  await insert(filterRoomData)

  console.log(`插入 ${region} 数据完成, 数据总数: ${list.length}`)
}
