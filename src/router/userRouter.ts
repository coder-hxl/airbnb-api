import Router from '@koa/router'

import userController from '@/controller/user'

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', userController.create)

export default userRouter
