import axios from 'axios'

import { headers, getRoomListUrl, getRoomDetailUrl, getImgUrl } from './config'

type IGetRoomDetailsRes = {
  id: number
  userId: number
  name: string
  address: string
  introduce: string
  pictureUrl?: string[]
}[]

type IGetPictureRes = {
  roomId: number
  imgUrls: string[]
}[]

function getRoomDetails(userId: number, ids: number[]) {
  return new Promise<IGetRoomDetailsRes>((result) => {
    const getRes: IGetRoomDetailsRes = []
    ids.forEach((id) => {
      axios.get(getRoomDetailUrl(id), { headers }).then((res) => {
        const data = res.data.data[0]
        getRes.push({
          id,
          userId,
          name: data.name,
          address: data.addr,
          introduce: data.introduction
        })
        if (getRes.length === ids.length) result(getRes)
      })
    })
  })
}

function getPicture(ids: number[]) {
  return new Promise<IGetPictureRes>((result) => {
    const getRes: IGetPictureRes = []
    ids.forEach((id) => {
      axios.get(getImgUrl(id), { headers }).then((res) => {
        const data = res.data.data.slice(0, 2)
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

export async function getRoomData(userId: number, searchName: string) {
  const listRes = await axios.get(getRoomListUrl(searchName), { headers })
  const queryIds: number[] = listRes.data['query_ids'].map(
    (item: any) => item.poiId
  )

  const roomData = await getRoomDetails(userId, queryIds)
  const pictureData = await getPicture(queryIds)

  pictureData.forEach((item) => {
    const roomIndex = roomData.findIndex((room) => room.id == item.roomId)
    roomData[roomIndex].pictureUrl = item.imgUrls
  })

  return roomData
}
