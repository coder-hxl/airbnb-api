import Koa from 'koa'

const app = new Koa()

app.use((ctx) => {
  ctx.body = 'Hello Airbnb-API'
})

export default app
