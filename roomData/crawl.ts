import https from 'node:https'
import URL from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { headers, getRoomDetailUrl, getImgUrl } from './config'

import type { IRoomData } from './types'

type IGetPictureRes = {
  roomId: number
  imgUrls: string[]
}[]

type ISearchMap = {
  id: number
  price: number
}[]

function get<T = any>(url: string) {
  const { host, pathname, search } = new URL.URL(url)
  const path = pathname + search
  return new Promise<T>((resolve) => {
    https.get({ headers, host, path }, (res) => {
      const content: Buffer[] = []
      res.on('data', (chunk) => content.push(chunk))
      res.on('end', () =>
        resolve(JSON.parse(Buffer.concat(content).toString()))
      )
    })
  })
}

function getRoomDetails(
  userId: number,
  searchName: string,
  searchMap: ISearchMap
) {
  return new Promise<IRoomData>((result) => {
    const getRes: IRoomData = { region: searchName, list: [] }
    searchMap.forEach((item) => {
      const { id, price } = item
      get(getRoomDetailUrl(id)).then((res) => {
        const { name, introduction, addr, areaName, hotelType, lng, lat } =
          res.data[0]

        getRes.list.push({
          id,
          name,
          introduction,
          address: addr,
          areaName,
          price,
          type: hotelType,
          geo: `ST_GeomFromText('POINT(${lng} ${lat})', 0)`,
          userId
        })
        if (getRes.list.length === searchMap.length) result(getRes)
      })
    })
  })
}

function getPicture(searchMap: ISearchMap) {
  return new Promise<IGetPictureRes>((result) => {
    const getRes: IGetPictureRes = []

    searchMap.forEach((item) => {
      const { id } = item
      get(getImgUrl(id)).then((res) => {
        const data = res.data.slice(0, 2)
        const aspect = data[0]?.imgs[0].urls || []
        const guestRoom = data[1]?.imgs[0].urls || []
        const imgUrls: string[] = [...aspect, ...guestRoom].map(
          (item: string) => item.replace('/w.h', '')
        )
        getRes.push({ roomId: id, imgUrls })
        if (getRes.length === searchMap.length) result(getRes)
      })
    })
  })
}

export default async function getRoomData(
  userId: number,
  region: { name: string; url: string; filename: string }
) {
  const { name, filename, url } = region

  const searchRes = await get(url)
  const searchMap: ISearchMap = searchRes.data.searchresult.map(
    (item: any) => ({
      id: item.poiid,
      price: item.lowestPrice
    })
  )

  const roomData = await getRoomDetails(userId, name, searchMap)
  const pictureData = await getPicture(searchMap)
  pictureData.forEach((item) => {
    const roomIndex = roomData.list.findIndex((room) => room.id == item.roomId)
    roomData.list[roomIndex].pictureUrl = item.imgUrls
  })

  // 缓存一份
  fs.writeFile(
    path.resolve(__dirname, `./data/${filename}.json`),
    JSON.stringify(roomData),
    (err) => {
      if (err) console.log('err: ', err.message)

      console.log(`${name} 数据成功, 房间总数: ${roomData.list.length}`)
    }
  )

  return roomData
}
