import path from 'path'

export const GITHUB_REP =
  'https://raw.githubusercontent.com/coder-hxl/airbnb-upload/master'

export const GITHUB_ROOM_PICTURE = GITHUB_REP + '/room'
export const GITHUB_AREA_PICTURE = GITHUB_REP + '/area'

export const UPLOAD_PATH = path.resolve(__dirname, '../../upload')

export const ROOM_PICTURE_PATH = path.resolve(UPLOAD_PATH, 'room')
export const AREA_PICTURE_PATH = path.resolve(UPLOAD_PATH, 'area')

export const AVATAR_PATCH = path.resolve(UPLOAD_PATH, 'avatar')
