import User from '@/models/user'
import { asyncHandler } from '@/utils/async-handler'
import { UnauthorizedError } from '@/utils/error'
import { decodeToken } from '@/utils/jwt-token'
import type { Request, Response, NextFunction } from 'express'

export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    throw new UnauthorizedError('Token is required')
  }

  const payload = decodeToken(token)
  const user = await User.findById(payload.id)
  if (!user) {
    throw new UnauthorizedError('User not found')
  }

  req.user = user
  next()
})
