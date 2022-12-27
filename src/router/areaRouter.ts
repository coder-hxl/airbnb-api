import Router from '@koa/router'

import areaController from '@/controller/area'

const areaRouter = new Router({ prefix: '/area' })

areaRouter.get('/:areaId/picture/:filename', areaController.picture)

export default areaRouter
