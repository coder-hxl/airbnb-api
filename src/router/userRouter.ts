import Router from '@koa/router'

import {
  verifyAuth,
  verifyCreateUser,
  verifyIsOwner
} from '@/middleware/verifyMiddleware'
import { passwordHandle } from '@/middleware/userMiddleware'
import userController from '@/controller/user'

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', verifyCreateUser, passwordHandle, userController.create)
userRouter.get('/:userId', verifyIsOwner, userController.detail)
userRouter.patch('/', verifyAuth, userController.update)

userRouter.get('/:userId/avatar/:filename', userController.avatarInfo)

export default userRouter
