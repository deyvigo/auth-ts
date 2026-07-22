import { UserDocument } from '@/models/user'

export const getMyProfile = (user: UserDocument) => {
  return user.toJSON()
}
