import { portfolioRepository } from '../repositories/portfolio.repository'
import { holdingRepository } from '../repositories/holding.repository'
import { transactionRepository } from '../repositories/transaction.repository'
import { marketService } from './market.service'
import { AppError } from './auth.service'

function summarizeHoldings(holdings: Array<{ quantity: number; averageBuyPrice: number; currentPrice: number; totalInvested: number; coinId: string; symbol: string; name: string }>) {
  const totalInvested = holdings.reduce((sum, holding) => sum + holding.totalInvested, 0)
  const currentValue = holdings.reduce((sum, holding) => sum + holding.quantity * holding.currentPrice, 0)
  const profitLoss = currentValue - totalInvested
  const allocation = holdings.map((holding) => ({
    coinId: holding.coinId,
    symbol: holding.symbol,
    name: holding.name,
    value: holding.quantity * holding.currentPrice,
    percentage: currentValue > 0 ? ((holding.quantity * holding.currentPrice) / currentValue) * 100 : 0
  }))
  return { totalInvested, currentValue, profitLoss, profitLossPct: totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0, allocation }
}

async function withSummary(userId: string, portfolio: any) {
  const holdings = await holdingRepository.listByPortfolio(userId, portfolio._id.toString())
  const prices = await marketService.prices(holdings.map((holding) => holding.coinId)).catch((): Record<string, { usd: number }> => ({}))
  const refreshed = holdings.map((holding) => {
    const currentPrice = prices[holding.coinId]?.usd ?? holding.currentPrice
    return { ...holding.toObject(), currentPrice, currentValue: holding.quantity * currentPrice, profitLoss: holding.quantity * currentPrice - holding.totalInvested }
  })
  return { ...portfolio.toObject(), summary: summarizeHoldings(refreshed), holdings: refreshed }
}

export const portfolioService = {
  async list(userId: string) {
    const portfolios = await portfolioRepository.list(userId)
    return Promise.all(portfolios.map((portfolio) => withSummary(userId, portfolio)))
  },
  async get(userId: string, id: string) {
    const portfolio = await portfolioRepository.findById(userId, id)
    if (!portfolio) throw new AppError(404, 'NOT_FOUND', 'Portfolio not found')
    const [detail, transactions] = await Promise.all([withSummary(userId, portfolio), transactionRepository.list(userId, { portfolioId: id })])
    return { ...detail, transactions }
  },
  create(userId: string, data: { name: string; baseCurrency?: string; description?: string }) {
    return portfolioRepository.create(userId, data)
  },
  async update(userId: string, id: string, data: { name?: string; baseCurrency?: string; description?: string }) {
    const portfolio = await portfolioRepository.update(userId, id, data)
    if (!portfolio) throw new AppError(404, 'NOT_FOUND', 'Portfolio not found')
    return portfolio
  },
  async delete(userId: string, id: string) {
    const portfolio = await portfolioRepository.delete(userId, id)
    if (!portfolio) throw new AppError(404, 'NOT_FOUND', 'Portfolio not found')
    await Promise.all([holdingRepository.deleteByPortfolio(userId, id), transactionRepository.deleteByPortfolio(userId, id)])
  }
}
