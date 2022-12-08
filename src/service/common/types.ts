import type { AnyObject } from '@/types/commonTypes'

export interface ICommonService {
  select<T = any>(tableName: string, field?: AnyObject): Promise<T[]>
}
