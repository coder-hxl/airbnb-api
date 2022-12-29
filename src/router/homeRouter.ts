import Router from '@koa/router'

import homeController from '@/controller/home'

const homeRouter = new Router({ prefix: '/home' })

homeRouter.get('/wonderfulplace', homeController.wonderfulPlace)

homeRouter.get('/hotplace', homeController.hotPlace)

homeRouter.get('/longfor', homeController.longFor)

homeRouter.get('/highscore', homeController.highScore)

homeRouter.get('/goodprice', homeController.goodPrice)

homeRouter.get('/plus', homeController.plus)

export default homeRouter
