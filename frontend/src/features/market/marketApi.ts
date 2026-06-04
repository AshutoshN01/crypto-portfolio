import api, { ApiSuccess } from '../../services/api'
import { MarketCoin } from '../../types/product'

export async function getTopCoins(limit = 25) {
  const response = await api.get<ApiSuccess<{ coins: MarketCoin[] }>>('/markets/coins', { params: { limit } })
  return response.data.data.coins
}
