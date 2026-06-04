import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import { useTopCoins } from '../features/market/useMarketQueries'
import { compact, currency, percent } from '../utils/format'

export default function MarketsPage() {
  const { data = [], isLoading, isError } = useTopCoins(50)

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold">Markets</h2>
        <p className="mt-2 text-sm text-muted">CoinGecko market data, prices, market caps, and 24h movement.</p>
      </section>
      {isLoading && <Skeleton className="h-96" />}
      {isError && <EmptyState title="Market data unavailable" description="CoinGecko may be rate-limited or unreachable." />}
      {!isLoading && !isError && (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-muted"><tr><th className="py-3">Asset</th><th>Price</th><th>Market Cap</th><th>24h</th></tr></thead>
            <tbody>
              {data.map((coin) => (
                <tr key={coin.id} className="border-t border-white/10">
                  <td className="flex items-center gap-3 py-3">{coin.image && <img src={coin.image} className="h-7 w-7" alt="" />}<span>{coin.name} <span className="text-muted">{coin.symbol.toUpperCase()}</span></span></td>
                  <td>{currency(coin.current_price)}</td>
                  <td>{compact(coin.market_cap)}</td>
                  <td className={coin.price_change_percentage_24h >= 0 ? 'text-accent' : 'text-red-300'}>{percent(coin.price_change_percentage_24h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
