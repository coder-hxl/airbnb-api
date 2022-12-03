import fs from 'fs'
import path from 'path'

export function recursionGetFilePath(targetPath: string, fileSuffix: string) {
  const filePathRes: string[] = []

  fs.readdirSync(targetPath).forEach((name) => {
    const filePath = path.resolve(targetPath, name)

    if (name.endsWith(fileSuffix)) {
      filePathRes.push(filePath)
    } else if (!name.includes('.')) {
      const res = recursionGetFilePath(filePath, fileSuffix)
      filePathRes.push(...res)
    }
  })

  return filePathRes
}
