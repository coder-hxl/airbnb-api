import Router from '@koa/router'

import homeController from '@/controller/home'

const homeRouter = new Router({ prefix: '/home' })

homeRouter.get('/wonderfulplaces', homeController.wonderfulPlaces)

export default homeRouter
