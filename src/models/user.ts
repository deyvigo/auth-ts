import mongoose, { Schema, type HydratedDocument, type Model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  id: string
  username: string
  password: string
  name: string
  lastName: string
  profile: string
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>
export type UserDocument = HydratedDocument<IUser, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.set('toJSON', {
  transform: (_, ret) => {
    const { _id, __v, ...user } = ret
    return {
      ...user,
      id: _id.toString(),
    }
  },
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = (mongoose.models.User || mongoose.model<IUser, UserModel>('User', userSchema)) as UserModel

export default User
