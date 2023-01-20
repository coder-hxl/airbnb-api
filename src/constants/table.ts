export const USER_TABLE_NAME = 'user'
export const USER_TABLE_CREATE_FILTER = [
  'name',
  'nickname',
  'password',
  'cellphone',
  'introduce',
  'avatarUrl'
] as const
export const USER_TABLE_UPDATE_FILTER = ['cellphone', 'introduce'] as const

export const ROOM_PICTURE_NAME = 'room_picture'
