import Transaction from '../models/Transaction'

export const transactionRepository = {
  list(userId: string, filters: { portfolioId?: string; type?: string }) {
    return Transaction.find({
      user: userId,
      ...(filters.portfolioId ? { portfolio: filters.portfolioId } : {}),
      ...(filters.type ? { type: filters.type } : {})
    }).sort({ executedAt: -1 })
  },
  create(data: Record<string, unknown>) {
    return Transaction.create(data)
  },
  deleteByPortfolio(userId: string, portfolioId: string) {
    return Transaction.deleteMany({ user: userId, portfolio: portfolioId })
  }
}
