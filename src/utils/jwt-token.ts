import jwt from 'jsonwebtoken'

import type { UserDocument } from '@/models/user'
import { UnauthorizedError } from './error'

const JWT_SECRET = process.env.SECRET_KEY || 'rawpasswordkasdkalkdas'

export const generateToken = (user: UserDocument) => {
  console.log(JWT_SECRET)
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    JWT_SECRET,
    {
      expiresIn: '3d',
      algorithm: 'HS256',
    },
  )
}

interface ITokenPayload {
  id: string
  username: string
}
export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as ITokenPayload
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired token')
  }
}
