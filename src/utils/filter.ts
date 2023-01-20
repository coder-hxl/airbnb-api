import type { AnyObject } from '@/types/commonTypes'

export function filterObj<T = AnyObject>(
  rawObj: AnyObject,
  extract: readonly string[]
): T {
  const result: AnyObject = {}
  const rawKeys = Object.keys(rawObj)

  for (const key of extract) {
    if (rawKeys.includes(key)) {
      const currentValue = rawObj[key]
      result[key] = currentValue
    }
  }

  return result as T
}
