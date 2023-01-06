import { get, sleep } from './common'

import pool from '@/app/database'

import { getRoomReviewUrl } from 'roomData/config'

function getSize(min: number, max: number): number {
  const res = Math.floor(Math.random() * max)

  if (res < min) {
    return getSize(min, max)
  }

  return res
}

const hasReviewId = [
  193581217, 597664, 92507, 643366, 961078, 1107323, 1133223, 1240008, 1240696
]
export default async function getRoomReviewData() {
  const roomStatement = `SELECT id FROM room;`

  const roomExeRes = await pool.execute<any[]>(roomStatement)
  const roomIds: number[] = roomExeRes[0]
    .map((item) => item.id)
    .filter((id) => !hasReviewId.includes(id))

  const exeRes: Promise<any>[] = []
  for (const id of roomIds) {
    console.log(id)

    await sleep(getSize(3000, 6000))

    const size = getSize(30, 100)
    const url = getRoomReviewUrl(id, size)

    const exe = get(url).then(async (res) => {
      const reviews = res.Data.List.map((listItem: any) => ({
        content: listItem.Content,
        star: listItem.Star / 10
      }))

      const reviewExe: Promise<any>[] = []
      for (const review of reviews) {
        const { content, star } = review
        const newStar = star == 5 ? star : getSize(0, 2) ? star + 0.5 : star

        const statement = `INSERT INTO room_review (star_rating, comment, user_id, room_id) VALUES (?, ?, ?, ?);`

        reviewExe.push(
          pool.execute(statement, [newStar, content, getSize(1, 3), id])
        )
      }

      return await Promise.all(reviewExe)
    })

    exeRes.push(exe)
  }

  await Promise.all(exeRes)
  console.log('完成~')
}
