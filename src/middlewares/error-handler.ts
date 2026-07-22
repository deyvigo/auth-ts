import type { Request, Response, NextFunction } from 'express'

interface AppError {
  statusCode: number
  message: string
  code: string
  details?: any
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({ succes: false, status_code: statusCode, code: err.code, message, details: err.details })
}
