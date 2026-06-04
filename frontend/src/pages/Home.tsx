import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import { useTopCoins } from '../features/market/useMarketQueries'
import { usePortfolios, useTransactions } from '../features/portfolio/usePortfolioQueries'
import { compact, currency, percent } from '../utils/format'

export default function Home() {
  const { data: portfolios = [], isLoading, isError: portfoliosError } = usePortfolios()
  const { data: coins = [], isError: marketsError } = useTopCoins(8)
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions()
  const totals = portfolios.reduce(
    (acc, portfolio) => ({
      value: acc.value + portfolio.summary.currentValue,
      invested: acc.invested + portfolio.summary.totalInvested,
      profitLoss: acc.profitLoss + portfolio.summary.profitLoss
    }),
    { value: 0, invested: 0, profitLoss: 0 }
  )
  const profitLossPct = totals.invested > 0 ? (totals.profitLoss / totals.invested) * 100 : 0
  const topHoldings = portfolios.flatMap((portfolio) => portfolio.holdings ?? []).sort((a, b) => (b.currentValue ?? 0) - (a.currentValue ?? 0)).slice(0, 5)
  const recentTransactions = transactions.slice(0, 6)
  const allocation = portfolios.flatMap((portfolio) => portfolio.summary.allocation).sort((a, b) => b.value - a.value).slice(0, 5)

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        <p className="mt-2 text-sm text-muted">Live portfolio overview built from your holdings and market data.</p>
      </section>

      {portfoliosError && <EmptyState title="Dashboard data unavailable" description="Could not load your portfolios. Please check that the backend is running and you are signed in." />}

      {isLoading ? <Skeleton className="h-32" /> : (
        <section className="grid gap-4 md:grid-cols-4">
          <Card><p className="text-sm text-muted">Portfolio Value</p><strong className="mt-2 block text-2xl">{currency(totals.value)}</strong></Card>
          <Card><p className="text-sm text-muted">Daily Change</p><strong className="mt-2 block text-2xl">{coins[0] ? percent(coins[0].price_change_percentage_24h) : '+0.00%'}</strong></Card>
          <Card><p className="text-sm text-muted">Profit/Loss</p><strong className={`mt-2 block text-2xl ${totals.profitLoss >= 0 ? 'text-accent' : 'text-red-300'}`}>{currency(totals.profitLoss)}</strong></Card>
          <Card><p className="text-sm text-muted">Return</p><strong className={`mt-2 block text-2xl ${profitLossPct >= 0 ? 'text-accent' : 'text-red-300'}`}>{percent(profitLossPct)}</strong></Card>
        </section>
      )}

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <h3 className="mb-4 text-base font-semibold">Top holdings</h3>
          {topHoldings.length === 0 ? <EmptyState title="No holdings yet" description="Create a portfolio and add assets to populate this widget." /> : topHoldings.map((holding) => (
            <div key={holding._id} className="flex items-center justify-between border-b border-white/10 py-3 last:border-0">
              <span>{holding.name} <span className="text-muted">{holding.symbol}</span></span>
              <strong>{currency(holding.currentValue)}</strong>
            </div>
          ))}
        </Card>
        <Card>
          <h3 className="mb-4 text-base font-semibold">Recent transactions</h3>
          {transactionsLoading ? <Skeleton className="h-32" /> : recentTransactions.length === 0 ? <EmptyState title="No transactions" description="Transactions are created when holdings are added." /> : recentTransactions.map((transaction) => (
            <div key={transaction._id} className="flex items-center justify-between border-b border-white/10 py-3 text-sm last:border-0">
              <span>{transaction.type} {transaction.symbol}</span>
              <span className="text-muted">{currency(transaction.quantity * transaction.price)}</span>
            </div>
          ))}
        </Card>
        <Card>
          <h3 className="mb-4 text-base font-semibold">Asset allocation</h3>
          {allocation.length === 0 ? <EmptyState title="No allocation" description="Allocation appears after holdings are added." /> : allocation.map((item) => (
            <div key={`${item.coinId}-${item.value}`} className="mb-3">
              <div className="mb-1 flex justify-between text-sm"><span>{item.symbol}</span><span>{percent(item.percentage).replace('+', '')}</span></div>
              <div className="h-2 rounded-sm bg-bg"><div className="h-2 rounded-sm bg-primary" style={{ width: `${Math.min(item.percentage, 100)}%` }} /></div>
            </div>
          ))}
        </Card>
      </section>

      <Card>
        <h3 className="mb-4 text-base font-semibold">Market leaders</h3>
        {marketsError && <EmptyState title="Market data unavailable" description="Could not load CoinGecko prices right now." />}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {coins.slice(0, 4).map((coin) => (
            <div key={coin.id} className="rounded-sm bg-bg p-3">
              <div className="flex items-center gap-2">{coin.image && <img src={coin.image} className="h-6 w-6" alt="" />}<strong>{coin.name}</strong></div>
              <p className="mt-2 text-xl font-semibold">{currency(coin.current_price)}</p>
              <p className="text-sm text-muted">Cap {compact(coin.market_cap)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
