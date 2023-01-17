import multer from '@koa/multer'

import { AVATAR_PATCH } from '@/constants/filepath'

const avatarUpload = multer({ dest: AVATAR_PATCH })
export const avatarHandle = avatarUpload.single('avatar')
