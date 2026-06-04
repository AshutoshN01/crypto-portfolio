import mongoose, { HydratedDocument, Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  email: string
  username: string
  password: string
  roles: string[]
  createdAt?: Date
}

export interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>
type UserModel = Model<IUser, object, IUserMethods>

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, lowercase: true, index: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password)
}

const User = mongoose.model<IUser, UserModel>('User', userSchema)
export default User
