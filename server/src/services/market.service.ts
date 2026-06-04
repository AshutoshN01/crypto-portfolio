type CacheEntry<T> = { expiresAt: number; value: T }

const cache = new Map<string, CacheEntry<unknown>>()
const ttlMs = 60_000
const baseUrl = 'https://api.coingecko.com/api/v3'

async function cached<T>(key: string, loader: () => Promise<T>) {
  const hit = cache.get(key) as CacheEntry<T> | undefined
  if (hit && hit.expiresAt > Date.now()) return hit.value
  const value = await loader()
  cache.set(key, { value, expiresAt: Date.now() + ttlMs })
  return value
}

async function coingecko<T>(path: string) {
  const response = await fetch(`${baseUrl}${path}`, { headers: { accept: 'application/json' } })
  if (!response.ok) throw new Error(`CoinGecko request failed: ${response.status}`)
  return response.json() as Promise<T>
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

export const marketService = {
  topCoins(limit = 25) {
    return cached(`top:${limit}`, () =>
      coingecko<MarketCoin[]>(`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`)
    )
  },
  coinDetails(id: string) {
    return cached(`coin:${id}`, () => coingecko(`/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`))
  },
  async prices(ids: string[]) {
    if (ids.length === 0) return {}
    return cached(`prices:${ids.sort().join(',')}`, () => coingecko<Record<string, { usd: number }>>(`/simple/price?ids=${ids.join(',')}&vs_currencies=usd`))
  }
}
