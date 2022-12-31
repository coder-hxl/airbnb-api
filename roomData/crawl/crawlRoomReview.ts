import { get } from './common'

import pool from '@/app/database'

import { getRoomReviewUrl } from 'roomData/config'

function getSize(min: number, max: number): number {
  const res = Math.floor(Math.random() * max)

  if (res < min) {
    return getSize(min, max)
  }

  return res
}

export default async function getRoomReviewData() {
  const roomStatement = `SELECT id FROM room;`

  const roomExeRes = await pool.execute<any[]>(roomStatement)
  const roomIds: number[] = roomExeRes[0]
    .map((item) => item.id)
    .filter((id) => id !== 92507 && id !== 597664 && id !== 193581217)

  const reviewsExe: Promise<any>[] = []
  for (const id of roomIds) {
    const size = getSize(30, 100)
    const url = getRoomReviewUrl(id, size)
    reviewsExe.push(get(url))
  }

  const reviewsExeRes = await Promise.all(reviewsExe)
  const reviewList = reviewsExeRes.map((item) =>
    item.Data.List.map((listItem: any) => ({
      content: listItem.Content,
      star: listItem.Star / 10
    }))
  )

  const exes: Promise<any>[] = []
  roomIds.forEach((id, index) => {
    const review = reviewList[index]

    for (const item of review) {
      const { content, star } = item
      const newStar = star == 5 ? star : getSize(0, 2) ? star + 0.5 : star

      const statement = `INSERT INTO room_review (star_rating, comment, user_id, room_id) VALUES (?, ?, ?, ?);`

      exes.push(pool.execute(statement, [newStar, content, getSize(1, 3), id]))
    }
  })

  await Promise.all(exes)
  console.log('完成~')
}
