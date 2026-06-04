import User, { IUser } from '../models/User'

export const userRepository = {
  findByEmailOrUsername(identifier: string) {
    return User.findOne({ $or: [{ email: identifier.toLowerCase() }, { username: identifier }] })
  },

  findById(id: string) {
    return User.findById(id)
  },

  create(data: Pick<IUser, 'email' | 'username' | 'password'>) {
    return User.create(data)
  }
}
