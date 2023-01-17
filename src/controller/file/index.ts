import IfileController from './types'

import { APP_HOST, APP_PORT } from '@/app/config'
import fileService from '@/service/file/index'

const fileController: IfileController = {
  async saveAvatarInfo(ctx) {
    const { id } = ctx.user
    const { filename, mimetype, size } = ctx.file
    const url = `${APP_HOST}:${APP_PORT}/api/user/${id}/avatar/${filename}`

    const isSuccess = await fileService.createAvatar(
      id,
      url,
      filename,
      mimetype,
      size
    )

    if (!isSuccess) {
      console.log('Not Success')
    }

    ctx.body = {
      code: 200,
      data: '更新成功~'
    }
  }
}

export default fileController
