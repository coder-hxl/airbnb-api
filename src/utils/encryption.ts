import crypto from 'node:crypto'

export function hashCrypto(str: string) {
  const hash = crypto.createHash('sha256')
  const result = hash.update(str).digest('hex')

  return result
}
