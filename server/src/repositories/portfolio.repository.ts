import Portfolio from '../models/Portfolio'

export const portfolioRepository = {
  list(userId: string) {
    return Portfolio.find({ user: userId }).sort({ createdAt: -1 })
  },
  findById(userId: string, id: string) {
    return Portfolio.findOne({ _id: id, user: userId })
  },
  create(userId: string, data: { name: string; baseCurrency?: string; description?: string }) {
    return Portfolio.create({ user: userId, ...data })
  },
  update(userId: string, id: string, data: { name?: string; baseCurrency?: string; description?: string }) {
    return Portfolio.findOneAndUpdate({ _id: id, user: userId }, data, { new: true, runValidators: true })
  },
  delete(userId: string, id: string) {
    return Portfolio.findOneAndDelete({ _id: id, user: userId })
  }
}
