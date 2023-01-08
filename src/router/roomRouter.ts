import Router from '@koa/router'

import roomController from '@/controller/room/index'

const roomRouter = new Router({ prefix: '/room' })

roomRouter.get('/:roomId', roomController.detail)
roomRouter.post('/review', roomController.review)

// 房间图片
roomRouter.get('/:roomId/room_picture/:filename', roomController.picture)

export default roomRouter
