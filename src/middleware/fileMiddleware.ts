import multer from '@koa/multer'

import { AVATAR_PATCH } from '@/constants/filepath'

const avatarUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, AVATAR_PATCH)
    },
    filename(req, file, cb) {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const suffix = file.originalname.split('.').pop()
      const filename = `${unique}.${suffix}`
      cb(null, filename)
    }
  })
})
export const avatarHandle = avatarUpload.single('avatar')
