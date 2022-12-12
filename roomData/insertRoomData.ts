import pool from '../src/app/database'

import * as roomData from './roomData'

type IRoom = {
  id: number
  userId: number
  name: string
  address: string
  introduce: string
  pictureUrl: string[]
  typeTabIds?: number[]
}

type IData = {
  region: string
  list: IRoom[]
}

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

const ids: number[] = []
const region: IRegion = []
const roomTypeTab: IRoomTypeTab = []

async function dataHandle(data: IData) {
  // 1.去掉id相同的房间
  const filterDataById = data.list.filter((item) => {
    const res = ids.includes(item.id) ? false : true
    res && ids.push(item.id)
    return res
  })

  // 2.处理房间所在的地区
  if (!region.length) {
    const [regionRes] = await pool.execute<any[]>('SELECT * FROM region;')
    region.push(...regionRes)
  }

  const regioId = region
    .filter((item) => item.name === data.region)
    .map((item) => item.id)[0]

  // 3.处理房间类型标签
  if (!roomTypeTab.length) {
    const [roomTypeTabRes] = await pool.execute<any[]>(
      'SELECT * FROM room_type_tab;'
    )
    roomTypeTab.push(...roomTypeTabRes)
  }

  const handleRes = filterDataById.map((item) => {
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
  return new Promise((result) => {
    for (const item of list) {
      const { id, name, address, introduce, userId, typeTabIds } = item

      const RStatement = `INSERT INTO room (id, name, address, introduce, userId, regionId) VALUES (?, ?, ?, ?, ?, ?);`

      pool
        .execute(RStatement, [id, name, address, introduce, userId, regionId])
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
          if (insertResult.length == list.length) result(insertResult)
        })
    }
  })
}

async function insertRoomData(data: IData) {
  console.log(`正在插入 ${data.region} 数据~`)

  const { regioId, handleRes } = await dataHandle(data)

  await insert(regioId, handleRes)

  console.log(`插入 ${data.region} 数据完成, 数据总数: ${data.list.length}`)
}

insertRoomData(roomData.haiLingDao)

const keys = Object.keys(roomData)
for (const key of keys) {
  const data = roomData as any
  insertRoomData(data[key])
}
