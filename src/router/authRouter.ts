import Router from '@koa/router'

const authRouter = new Router()

authRouter.post('/login', (ctx) => {
  ctx.body = 'login success'
})

export default authRouter
