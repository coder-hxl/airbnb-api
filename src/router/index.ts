import { recursionGetFilePath } from '@/utils/pathHandle'

import type Router from '@koa/router'
import type { IApp } from '@/app/types'

export default function useRouter(this: IApp) {
  const routerPaths = recursionGetFilePath(__dirname, 'Router.js')

  routerPaths.forEach((path) => {
    const router: Router = require(path).default
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}
