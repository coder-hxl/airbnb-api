import https from 'node:https'
import URL from 'node:url'

import { headers, getRoomDetailUrl, getImgUrl } from './config'

import type { IRoomData } from './types'

type IGetPictureRes = {
  roomId: number
  imgUrls: string[]
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

function getRoomDetails(userId: number, searchName: string, ids: number[]) {
  return new Promise<IRoomData>((result) => {
    const getRes: IRoomData = { region: searchName, list: [] }
    ids.forEach((id) => {
      get(getRoomDetailUrl(id)).then((res) => {
        const data = res.data[0]
        getRes.list.push({
          id,
          userId,
          name: data.name,
          address: data.addr,
          introduce: data.introduction
        })
        if (getRes.list.length === ids.length) result(getRes)
      })
    })
  })
}

function getPicture(ids: number[]) {
  return new Promise<IGetPictureRes>((result) => {
    const getRes: IGetPictureRes = []
    ids.forEach((id) => {
      get(getImgUrl(id)).then((res) => {
        const data = res.data.slice(0, 2)
        const aspect = data[0].imgs[0].urls
        const guestRoom = data[1].imgs[0].urls
        const imgUrls: string[] = [...aspect, ...guestRoom].map(
          (item: string) => item.replace('/w.h', '')
        )
        getRes.push({ roomId: id, imgUrls })
        if (getRes.length === ids.length) result(getRes)
      })
    })
  })
}

export default async function getRoomData(
  userId: number,
  region: { name: string; url: string }
) {
  const { name, url } = region

  const searchRes = await get(url)
  const queryIds: number[] = searchRes.query_ids.map((item: any) => item.poiId)

  const roomData = await getRoomDetails(userId, name, queryIds)
  const pictureData = await getPicture(queryIds)
  pictureData.forEach((item) => {
    const roomIndex = roomData.list.findIndex((room) => room.id == item.roomId)
    roomData.list[roomIndex].pictureUrl = item.imgUrls
  })

  return roomData
}
