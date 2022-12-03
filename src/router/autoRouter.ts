import Router from '@koa/router'

const autoRouter = new Router()

autoRouter.post('/login', (ctx) => {
  ctx.body = 'login success'
})

export default autoRouter
