import type { Request, Response, NextFunction } from 'express'

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -- ${res.statusCode}`)
  })
  next()
}
