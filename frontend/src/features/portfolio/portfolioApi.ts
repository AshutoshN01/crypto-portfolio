import api, { ApiSuccess } from '../../services/api'
import { Holding, Portfolio, Transaction } from '../../types/product'

export async function listPortfolios() {
  const response = await api.get<ApiSuccess<{ portfolios: Portfolio[] }>>('/portfolios')
  return response.data.data.portfolios
}

export async function getPortfolio(id: string) {
  const response = await api.get<ApiSuccess<{ portfolio: Portfolio }>>(`/portfolios/${id}`)
  return response.data.data.portfolio
}

export async function createPortfolio(input: { name: string; baseCurrency?: string; description?: string }) {
  const response = await api.post<ApiSuccess<{ portfolio: Portfolio }>>('/portfolios', input)
  return response.data.data.portfolio
}

export async function updatePortfolio(id: string, input: { name?: string; baseCurrency?: string; description?: string }) {
  const response = await api.patch<ApiSuccess<{ portfolio: Portfolio }>>(`/portfolios/${id}`, input)
  return response.data.data.portfolio
}

export async function deletePortfolio(id: string) {
  await api.delete(`/portfolios/${id}`)
}

export async function createHolding(input: { portfolioId: string; coinId: string; symbol: string; name: string; quantity: number; averageBuyPrice: number }) {
  const response = await api.post<ApiSuccess<{ holding: Holding }>>('/holdings', input)
  return response.data.data.holding
}

export async function updateHolding(id: string, input: { quantity?: number; averageBuyPrice?: number; currentPrice?: number }) {
  const response = await api.patch<ApiSuccess<{ holding: Holding }>>(`/holdings/${id}`, input)
  return response.data.data.holding
}

export async function deleteHolding(id: string) {
  await api.delete(`/holdings/${id}`)
}

export async function listTransactions(filters: { portfolioId?: string; type?: string }) {
  const response = await api.get<ApiSuccess<{ transactions: Transaction[] }>>('/transactions', { params: filters })
  return response.data.data.transactions
}

export async function createTransaction(input: { portfolioId: string; holdingId?: string; type: Transaction['type']; coinId: string; symbol: string; quantity: number; price: number; fee?: number; note?: string }) {
  const response = await api.post<ApiSuccess<{ transaction: Transaction }>>('/transactions', input)
  return response.data.data.transaction
}
