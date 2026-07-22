import User, { UserDocument } from '@/models/user'
import type { IUserLoginRequest, IUserRegisterRequest } from '@/types/auth'
import { ResourceNotFoundError, UnauthorizedError, UsernameAlreadyTakenError } from '@/utils/error'
import { generateToken } from '@/utils/jwt-token'

export const registerUser = async ({ username, password, name, lastName, profile }: IUserRegisterRequest) => {
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    throw new UsernameAlreadyTakenError('Username already taken')
  }

  const user = await User.create({ username, password, name, lastName, profile })
  const { password: _, ...userData } = user.toJSON()
  return userData
}

export const loginUser = async ({ username, password }: IUserLoginRequest) => {
  const user = await User.findOne({ username }).select('+password')
  if (!user) {
    throw new UnauthorizedError('Username or password is incorrect')
  }

  const isPasswordCorrect = user ? await user.comparePassword(password) : false
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Username or password is incorrect')
  }

  const token = generateToken(user)
  return token
}
