import Router from '@koa/router'

import { verifyCreateUser } from '@/middleware/verifyMiddleware'
import { passwordHandle } from '@/middleware/userMiddleware'
import userController from '@/controller/user'

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', verifyCreateUser, passwordHandle, userController.create)
userRouter.get('/:userId', userController.detail)

export default userRouter
