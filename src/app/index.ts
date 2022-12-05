import Koa from 'koa'
import { koaBody } from 'koa-body'

import useRouter from '@/router'

import { IApp } from './types'

const app: IApp = new Koa()
app.useRouter = useRouter

app.use(koaBody())
app.useRouter()

export default app
