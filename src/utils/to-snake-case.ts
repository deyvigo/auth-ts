import { Types } from 'mongoose'

export const toSnakeCase = (value: unknown): unknown => {
  if (value === undefined || value === null) {
    return value
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (value instanceof Types.ObjectId) {
    return value.toString()
  }

  if (Array.isArray(value)) {
    return value.map(toSnakeCase)
  }

  if (value !== null && typeof value === 'object') {
    return Object.entries(value).reduce(
      (acc, [key, value]) => {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        acc[snakeKey] = toSnakeCase(value)
        return acc
      },
      {} as Record<string, unknown>,
    )
  }

  return value
}
