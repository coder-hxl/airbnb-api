import app from '@/app'

import { APP_PORT } from '@/app/config'

app.listen(APP_PORT, () => {
  console.log(111)
  console.log(`服务器在 ${APP_PORT} 端口启动成功~`)
})
