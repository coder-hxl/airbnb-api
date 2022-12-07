export interface ICommonService {
  query<T = any>(
    tableName: string,
    field: string | string[],
    value: any
  ): Promise<T[]>
}
