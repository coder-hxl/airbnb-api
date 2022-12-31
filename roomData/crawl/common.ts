import https from 'node:https'
import URL from 'node:url'

import { headers } from '../config'

export function get<T = any>(url: string) {
  const { host, pathname, search } = new URL.URL(url)
  const path = pathname + search
  return new Promise<T>((resolve) => {
    https.get({ headers, host, path }, (res) => {
      const content: Buffer[] = []
      res.on('data', (chunk) => content.push(chunk))
      res.on('end', () =>
        resolve(JSON.parse(Buffer.concat(content).toString()))
      )
    })
  })
}
