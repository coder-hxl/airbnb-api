import path from 'path'

export const GITHUB_MAP =
  'https://raw.githubusercontent.com/coder-hxl/airbnb-upload/master'

export const GITHUB_MAP_ROOM_PICTURE = GITHUB_MAP + '/room'

export const UPLOAD_PATH = path.resolve(__dirname, '../../upload')

export const ROOM_PICTURE_PATH = path.resolve(UPLOAD_PATH, 'room')
