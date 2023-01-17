import Router from '@koa/router'

import { verifyAuth } from '@/middleware/verifyMiddleware'
import { avatarHandle } from '@/middleware/fileMiddleware'
import fileController from '@/controller/file'

const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post(
  '/avatar',
  verifyAuth,
  avatarHandle,
  fileController.saveAvatarInfo
)

export default uploadRouter
