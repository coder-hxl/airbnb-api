import { MapTypeEmptyObject, MapTypeObject } from '@/types/commonTypes'
import type { IUserTable } from '../tableTypes'

export type ICreateInfo = MapTypeObject<
  IUserTable,
  'id' | 'createAt' | 'updateAt'
>

export type IUpdateInfo = MapTypeEmptyObject<
  IUserTable,
  'id' | 'name' | 'password' | 'avatarUrl' | 'createAt' | 'updateAt'
>

export type IDetail = MapTypeObject<IUserTable, 'updateAt'>

export default interface IUserService {
  create(userInfo: ICreateInfo): Promise<boolean>
  update(userId: number, updateInfo: IUpdateInfo): Promise<boolean>
  detail(userId: string): Promise<IDetail>
}
