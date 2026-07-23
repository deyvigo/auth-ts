import type { Request, Response, NextFunction } from 'express'
import { ZodError, type ZodType } from 'zod'

import { ValidationError } from '@/utils/error'

type DataSource = 'body' | 'query' | 'params' | 'file'

type ValidatedFile = Express.Multer.File

export const validate = <T extends ValidatedFile | Record<string, any>>(
  schema: ZodType<T>,
  dataSource: DataSource = 'body',
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let data: any

      if (dataSource === 'file') {
        if (!req.file) {
          throw new ValidationError('File is required', { file: 'File is required' })
        }
        data = req.file
      } else {
        data = req[dataSource]
      }

      const parsed = schema.parse(data)

      if (dataSource === 'file') {
        req.file = parsed as Express.Multer.File
      } else {
        req[dataSource] = parsed
      }

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
