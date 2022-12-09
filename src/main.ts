import app from '@/app'
import '@/app/database'

import { APP_PORT } from '@/app/config'

import { getRoomData } from '../crawl'

getRoomData(1, '海陵岛').then((res) => console.log(res, 1))
getRoomData(1, '阳江').then((res) => console.log(res, 2))

app.listen(APP_PORT, () => {
  console.log(`服务器在 ${APP_PORT} 端口启动成功~`)
})
