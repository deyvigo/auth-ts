import { toSnakeCase } from '@/utils/to-snake-case'
import type { Request, Response, NextFunction } from 'express'

export const responseSerializer = (req: Request, res: Response, next: NextFunction) => {
  const originalJSON = res.json.bind(res)
  res.json = (body: unknown) => {
    return originalJSON(toSnakeCase(body))
  }
  next()
}
