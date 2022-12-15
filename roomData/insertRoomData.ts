import pool from '@/app/database'

import type { IRoom, IRoomData } from './types'

type IRegion = {
  id: number
  name: string
  type: number
  parentId: number | null
  createAt: any
  updateAt: any
}[]

type IRoomTypeTab = {
  id: number
  name: string
  createAt: any
  updateAt: any
}[]

// ---------------------------------

const region: IRegion = []
const roomTypeTab: IRoomTypeTab = []

async function dataHandle(data: IRoomData) {
  // 1.处理房间所在的地区
  if (!region.length) {
    const [regionRes] = await pool.execute<any[]>('SELECT * FROM region;')
    region.push(...regionRes)
  }

  const regioId = region
    .filter((item) => item.name === data.region)
    .map((item) => item.id)[0]

  // 2.处理房间类型标签
  if (!roomTypeTab.length) {
    const [roomTypeTabRes] = await pool.execute<any[]>(
      'SELECT * FROM room_type_tab;'
    )
    roomTypeTab.push(...roomTypeTabRes)
  }

  const handleRes = data.list.map((item) => {
    const typeTabIds: number[] = []
    roomTypeTab.forEach((tab) =>
      item.name.includes(tab.name) && !typeTabIds.includes(tab.id)
        ? typeTabIds.push(tab.id)
        : null
    )

    return { ...item, typeTabIds }
  })

  return { regioId, handleRes }
}

function insert(regionId: number, list: IRoom[]) {
  const insertResult: any[] = []
  let lLength = list.length

  return new Promise((result) => {
    for (const item of list) {
      const { id, name, address, introduce, userId, typeTabIds } = item

      // 已存在的房间不用重复添加
      pool.execute('SELECT * FROM room WHERE id = ?;', [id]).then((res) => {
        const value: any = res[0]

        if (value.length) {
          lLength--
        } else {
          const RStatement = `INSERT INTO room (id, name, address, introduce, userId, regionId) VALUES (?, ?, ?, ?, ?, ?);`
          pool
            .execute(RStatement, [
              id,
              name,
              address,
              introduce,
              userId,
              regionId
            ])
            .then(() => {
              const all: Promise<any>[] = []
              const TStatment = `INSERT INTO r_room_room_type_tab (roomId, roomTypeTabId) VALUES (?, ?);`

              for (const tabId of typeTabIds ?? []) {
                all.push(pool.execute(TStatment, [id, tabId]))
              }

              return Promise.all(all)
            })
            .then(() => {
              insertResult.push(id)
              if (insertResult.length == lLength) result(insertResult)
            })
        }
      })
    }
  })
}

export default async function insertRoomData(data: IRoomData) {
  const { region, list } = data
  console.log(`正在插入 ${region} 数据~`)

  const { regioId, handleRes } = await dataHandle(data)

  await insert(regioId, handleRes)

  console.log(`插入 ${region} 数据完成, 数据总数: ${list.length}`)
}
