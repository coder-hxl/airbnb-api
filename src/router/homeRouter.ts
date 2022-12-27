import Router from '@koa/router'

import homeController from '@/controller/home'

const homeRouter = new Router({ prefix: '/home' })

homeRouter.get('/wonderfulplace', homeController.wonderfulPlace)

homeRouter.get('/hotplace', homeController.hotPlace)

homeRouter.get('/longfor', homeController.longfor)

export default homeRouter
