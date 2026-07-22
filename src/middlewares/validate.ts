import type { Request, Response, NextFunction } from 'express'
import { ZodError, type ZodType } from 'zod'

import { ValidationError } from '@/utils/error'

type DataSource = 'body' | 'query' | 'params'

export const validate = (schema: ZodType, dataSource: DataSource = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[dataSource]
      const parsed = schema.parse(data)

      req[dataSource] = parsed
      next()
    } catch (err: any) {
      if (err instanceof ZodError) {
        const fieldErrors = err.issues.reduce(
          (acc, error) => {
            const field = error.path.join('.')
            acc[field] = error.message
            return acc
          },
          {} as Record<string, string>,
        )

        throw new ValidationError(`Validation error`, fieldErrors)
      }
      next(err)
    }
  }
}
