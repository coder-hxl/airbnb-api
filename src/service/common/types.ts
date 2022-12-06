export interface ICommonService {
  query(tableName: string, field: string, value: any): Promise<any[]>
}
