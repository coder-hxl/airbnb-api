import Router from '@koa/router'

import roomController from '@/controller/room/index'

const roomRouter = new Router()

roomRouter.get('/room_picture/:roomId/:filename', roomController.picture)

export default roomRouter
