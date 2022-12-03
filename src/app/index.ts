import Koa from 'koa'

import useRouter from '@/router'

import { IApp } from './types'

const app: IApp = new Koa()
app.useRouter = useRouter

export default app
