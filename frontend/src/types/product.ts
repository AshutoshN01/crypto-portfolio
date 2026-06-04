export interface Holding {
  _id: string
  coinId: string
  symbol: string
  name: string
  quantity: number
  averageBuyPrice: number
  currentPrice: number
  totalInvested: number
  currentValue?: number
  profitLoss?: number
}

export interface Transaction {
  _id: string
  type: 'BUY' | 'SELL' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'FEE'
  coinId: string
  symbol: string
  quantity: number
  price: number
  fee: number
  note?: string
  executedAt: string
}

export interface PortfolioSummary {
  totalInvested: number
  currentValue: number
  profitLoss: number
  profitLossPct: number
  allocation: Array<{ coinId: string; symbol: string; name: string; value: number; percentage: number }>
}

export interface Portfolio {
  _id: string
  name: string
  baseCurrency: string
  description?: string
  holdings?: Holding[]
  transactions?: Transaction[]
  summary: PortfolioSummary
}

export interface MarketCoin {
  id: string
  symbol: string
  name: string
  image?: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
}
