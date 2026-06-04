import { holdingRepository } from '../repositories/holding.repository'
import { transactionRepository } from '../repositories/transaction.repository'
import { marketService } from './market.service'
import { AppError } from './auth.service'

export const holdingService = {
  async create(userId: string, input: { portfolioId: string; coinId: string; symbol: string; name: string; quantity: number; averageBuyPrice: number }) {
    const prices = await marketService.prices([input.coinId]).catch((): Record<string, { usd: number }> => ({}))
    const currentPrice = prices[input.coinId]?.usd ?? input.averageBuyPrice
    const holding = await holdingRepository.create({
      user: userId,
      portfolio: input.portfolioId,
      coinId: input.coinId,
      symbol: input.symbol,
      name: input.name,
      quantity: input.quantity,
      averageBuyPrice: input.averageBuyPrice,
      currentPrice,
      totalInvested: input.quantity * input.averageBuyPrice
    })
    await transactionRepository.create({
      user: userId,
      portfolio: input.portfolioId,
      holding: holding._id,
      type: 'BUY',
      coinId: input.coinId,
      symbol: input.symbol,
      quantity: input.quantity,
      price: input.averageBuyPrice,
      fee: 0,
      executedAt: new Date()
    })
    return holding
  },
  async update(userId: string, id: string, input: { quantity?: number; averageBuyPrice?: number; currentPrice?: number }) {
    const existing = await holdingRepository.findById(userId, id)
    if (!existing) throw new AppError(404, 'NOT_FOUND', 'Holding not found')
    const quantity = input.quantity ?? existing.quantity
    const averageBuyPrice = input.averageBuyPrice ?? existing.averageBuyPrice
    const holding = await holdingRepository.update(userId, id, { ...input, totalInvested: quantity * averageBuyPrice })
    if (!holding) throw new AppError(404, 'NOT_FOUND', 'Holding not found')
    return holding
  },
  async delete(userId: string, id: string) {
    const holding = await holdingRepository.delete(userId, id)
    if (!holding) throw new AppError(404, 'NOT_FOUND', 'Holding not found')
  }
}
