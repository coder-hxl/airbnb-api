import app from '@/app'
import '@/app/database'

import { APP_PORT } from '@/app/config'

// 爬取 room 数据到数据库中
// import 'roomData'

app.listen(APP_PORT, () => {
  console.log(`服务器在 ${APP_PORT} 端口启动成功~`)
})
