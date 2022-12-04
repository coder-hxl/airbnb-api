import Koa from 'koa'

import useRouter from '@/router'

import { IApp } from './types'

const app: IApp = new Koa()
app.useRouter = useRouter

app.useRouter()

export default app
