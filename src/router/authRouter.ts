import Router from '@koa/router'

import authController from '@/controller/auth/index'
import { verifyAuth, verifyLogin } from '@/middleware/verifyMiddleware'

const authRouter = new Router()

authRouter.post('/login', verifyLogin, authController.login)
authRouter.get('/test', verifyAuth, authController.test)

export default authRouter
