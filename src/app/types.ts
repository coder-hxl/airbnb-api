import type Koa from 'koa'

export interface IApp extends Koa {
  useRouter?: (this: IApp) => void
}
