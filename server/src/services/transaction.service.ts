import { transactionRepository } from '../repositories/transaction.repository'

export const transactionService = {
  list(userId: string, filters: { portfolioId?: string; type?: string }) {
    return transactionRepository.list(userId, filters)
  },
  create(userId: string, input: { portfolioId: string; holdingId?: string; type: string; coinId: string; symbol: string; quantity: number; price: number; fee?: number; note?: string; executedAt?: string }) {
    return transactionRepository.create({
      user: userId,
      portfolio: input.portfolioId,
      holding: input.holdingId,
      type: input.type,
      coinId: input.coinId,
      symbol: input.symbol,
      quantity: input.quantity,
      price: input.price,
      fee: input.fee ?? 0,
      note: input.note,
      executedAt: input.executedAt ? new Date(input.executedAt) : new Date()
    })
  }
}
