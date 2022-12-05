export interface ICommonField extends Object {
  id: number
  createAt: string
  updateAt: string
}

export interface IUserTable extends ICommonField {
  name: string
  password: string
  cellphone: string
  introduction?: string
  avatarUrl?: string
}
