import Router from '@koa/router'

import homeController from '@/controller/home'

const homeRouter = new Router({ prefix: '/home' })

homeRouter.get('/hotrecommenddest', homeController.hotRecommendDest)

export default homeRouter
