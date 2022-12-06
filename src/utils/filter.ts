import type { AnyObject } from '@/types/commonTypes'

export function filterObj(rawObj: AnyObject, extract: string[]) {
  const result: AnyObject = {}
  const rawKeys = Object.keys(rawObj)

  for (const key of extract) {
    if (rawKeys.includes(key)) {
      const currentValue = rawObj[key]
      result[key] = currentValue
    }
  }

  return result
}
