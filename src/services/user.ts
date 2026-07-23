import User, { UserDocument } from '@/models/user'
import { uploadToCloudinary } from '@/utils/cloudinary'

export const getMyProfile = (user: UserDocument) => {
  return user.toJSON()
}

export const uploadProfileImage = async (user: UserDocument, file: Express.Multer.File) => {
  const cloudinaryResponse = await uploadToCloudinary(file.buffer!, 'users')
  await User.updateOne({ _id: user._id }, { profile: cloudinaryResponse.secure_url })
  return cloudinaryResponse.secure_url
}
