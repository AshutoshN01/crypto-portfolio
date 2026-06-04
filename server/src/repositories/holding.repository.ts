import Holding from '../models/Holding'

export const holdingRepository = {
  listByPortfolio(userId: string, portfolioId: string) {
    return Holding.find({ user: userId, portfolio: portfolioId }).sort({ currentPrice: -1 })
  },
  findById(userId: string, id: string) {
    return Holding.findOne({ _id: id, user: userId })
  },
  findByCoin(userId: string, portfolioId: string, coinId: string) {
    return Holding.findOne({ user: userId, portfolio: portfolioId, coinId })
  },
  create(data: Record<string, unknown>) {
    return Holding.create(data)
  },
  update(userId: string, id: string, data: Record<string, unknown>) {
    return Holding.findOneAndUpdate({ _id: id, user: userId }, data, { new: true, runValidators: true })
  },
  delete(userId: string, id: string) {
    return Holding.findOneAndDelete({ _id: id, user: userId })
  },
  deleteByPortfolio(userId: string, portfolioId: string) {
    return Holding.deleteMany({ user: userId, portfolio: portfolioId })
  }
}
