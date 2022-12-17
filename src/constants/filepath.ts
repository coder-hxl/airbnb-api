import path from 'path'

export const GITHUB_REP =
  'https://raw.githubusercontent.com/coder-hxl/airbnb-upload/master'

export const GITHUB_ROOM_PICTURE = GITHUB_REP + '/room'

export const UPLOAD_PATH = path.resolve(__dirname, '../../upload')

export const ROOM_PICTURE_PATH = path.resolve(UPLOAD_PATH, 'room')
