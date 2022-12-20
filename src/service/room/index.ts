import pool from '@/app/database'

import { GITHUB_ROOM_PICTURE } from '@/constants/filepath'
import { USE_GITHUB_REP } from '@/app/config'

import IRoomService, {
  IDetailQueryRes,
  IDetailStatement,
  IDetailRes
} from './types'

const roomService: IRoomService = {
  async detail(roomId) {
    const {
      id,
      name,
      introduce,
      address,
      price,
      starRating,
      reviewsCount,
      reviews,
      pictureUrls,
      typeTabs,
      landlord
    } = await new Promise<IDetailQueryRes>((resolve) => {
      const statement: IDetailStatement = {
        rootStatement: `
        SELECT
      	  r.id, r.name, r.introduce, r.address, r.price,
      	  JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) landlord
        FROM room r
        LEFT JOIN user u ON r.user_id = u.id
        WHERE r.id = ?;
      `,

        pictureUrlStatement: `SELECT JSON_ARRAYAGG(url) pictureUrls FROM room_picture WHERE room_id = ?;`,

        typeTabStatement: `
        SELECT JSON_ARRAYAGG(rt.name) typeTabs
        FROM r_room_room_type_tab rrt
        LEFT JOIN room_type_tab rt ON rt.id = rrt.room_type_tab_id
        WHERE rrt.room_id = ?;
       `,

        reviewStatement: `
        SELECT
          ROUND(AVG(r.star_rating), 1) starRating, COUNT(*) reviewsCount,
          JSON_ARRAYAGG(
          	JSON_OBJECT('id', r.id, 'star_rating', r.star_rating,
          		'comment', r.comment, 'createAt', r.create_at,
          		'user', JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url))
          	) reviews
        FROM review r
        LEFT JOIN user u ON r.user_id = u.id
        WHERE room_id = 62136475;
        `
      }

      let res: IDetailQueryRes
      let count = 0
      const length = Object.keys(statement).length

      for (const key in statement) {
        const item = statement[key]
        pool.execute(item, [roomId]).then((qRes: any) => {
          const data = qRes[0][0]
          res = { ...res, ...data }
          if (++count == length) resolve(res)
        })
      }
    })

    // 调整顺序
    const res: IDetailRes = {
      id,
      name,
      introduce,
      address,
      price,
      starRating,
      reviewsCount,
      reviews,
      pictureUrls,
      typeTabs,
      landlord,
      info: null
    }

    // 是否使用 github 图床, 默认使用
    if (USE_GITHUB_REP == 'true') {
      const { id } = res
      res.pictureUrls =
        res.pictureUrls?.map((url) => {
          const filename = url.split('/room_picture/')[1]
          return `${GITHUB_ROOM_PICTURE}/${id}/${filename}`
        }) || []
    }

    // 是否满足超赞条件
    if (res.reviewsCount >= 2 && Number(res.starRating) >= 4.5) {
      res.info = {
        content: '超赞房东',
        contentColor: '#767676',
        fontSize: '10'
      }
    }

    return res
  }
}

export default roomService
