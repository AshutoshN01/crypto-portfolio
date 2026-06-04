import { useState } from 'react'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import { useTransactionStore, type TransactionType } from '../store/useTransactionStore'

export default function TransactionsPage() {
  const [type, setType] = useState<TransactionType | ''>('')
  const { transactions } = useTransactionStore()


  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl font-semibold">Transactions</h2>
          <p className="mt-2 text-sm text-muted">Filter and review buy, sell, transfer, and fee history.</p>
        </div>
        <select className="h-11 rounded-sm border border-white/10 bg-bg px-3 text-sm" value={type} onChange={(event) => setType(event.target.value)}>
          <option value="">All types</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
          <option value="TRANSFER_IN">TRANSFER_IN</option>
          <option value="TRANSFER_OUT">TRANSFER_OUT</option>
          <option value="FEE">FEE</option>
        </select>
      </section>
      <Card>
        {transactions.length === 0 ? (
          <EmptyState title="No transactions yet" description="Buy or sell from a portfolio to create transactions." />
        ) : (
          <div className="space-y-3">
            {transactions
              .filter((tx) => (type ? tx.type === type : true))
              .map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-sm bg-bg p-3 text-sm">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-black">
                        {tx.type}
                      </span>
                      <span>
                        {tx.coin} • {tx.quantity}
                      </span>
                    </span>
                    <div className="text-muted text-xs">Price: {tx.price}</div>
                  </div>
                  <span className="text-muted">{new Date(tx.dateTime).toLocaleString()}</span>
                </div>
              ))}
          </div>
        )}
      </Card>

    </div>
  )
}
