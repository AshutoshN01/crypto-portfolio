import { FormEvent, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import type { ButtonHTMLAttributes } from 'react'

import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Skeleton from '../components/ui/Skeleton'
import { usePortfolio, usePortfolioMutations } from '../features/portfolio/usePortfolioQueries'
import { useTransactionStore } from '../store/useTransactionStore'
import { currency } from '../utils/format'


type CoinOption = { id: string; symbol: string; name: string }

type HoldingWithMaybeImage = {

  image?: string
}

const POPULAR_COINS: CoinOption[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin' },
  { id: 'xrp', symbol: 'XRP', name: 'XRP' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polygon', symbol: 'MATIC', name: 'Polygon' }
]

const toInitials = (text: string) => {
  const parts = text.trim().split(/\s+/).filter(Boolean)
  const initials = parts.map((p) => p[0]).join('').slice(0, 2)
  return initials.toUpperCase() || '?'
}

export default function PortfolioDetailPage() {
  const { id } = useParams()
  const { data: portfolio, isLoading, isError } = usePortfolio(id)
  const mutations = usePortfolioMutations(id)

  const [addOpen, setAddOpen] = useState(false)
  const [buyOpen, setBuyOpen] = useState(false)
  const [sellOpenForHoldingId, setSellOpenForHoldingId] = useState<string | null>(null)

  const addTransaction = useTransactionStore((s) => s.addTransaction)


  const [addForm, setAddForm] = useState({ coinId: POPULAR_COINS[0].id, quantity: 0, buyPrice: 0 })
  const [buyForm, setBuyForm] = useState({ coinId: POPULAR_COINS[0].id, quantity: 0, purchasePrice: 0 })
  const [sellForm, setSellForm] = useState({ quantity: 0 })

  const selectedAddCoin: CoinOption = useMemo(
    () => POPULAR_COINS.find((c) => c.id === addForm.coinId) ?? POPULAR_COINS[0],
    [addForm.coinId]
  )
  const selectedBuyCoin: CoinOption = useMemo(
    () => POPULAR_COINS.find((c) => c.id === buyForm.coinId) ?? POPULAR_COINS[0],
    [buyForm.coinId]
  )

  const holdingToSell = useMemo(() => {
    if (!portfolio?.holdings || !sellOpenForHoldingId) return null
    return portfolio.holdings.find((h) => h._id === sellOpenForHoldingId) ?? null
  }, [portfolio?.holdings, sellOpenForHoldingId])

  const mutationError = Boolean(mutations.createHolding.error || mutations.deleteHolding.error || mutations.updateHolding.error)


  const addValidationError = useMemo(() => {
    if (addForm.quantity <= 0) return 'Quantity must be greater than 0.'
    if (addForm.buyPrice <= 0) return 'Buy price must be greater than 0.'
    return null
  }, [addForm.buyPrice, addForm.quantity])

  const buyValidationError = useMemo(() => {
    if (buyForm.quantity <= 0) return 'Quantity must be greater than 0.'
    if (buyForm.purchasePrice <= 0) return 'Purchase price must be greater than 0.'
    return null
  }, [buyForm.purchasePrice, buyForm.quantity])

  const sellValidationError = useMemo(() => {
    if (!holdingToSell) return null
    if (sellForm.quantity <= 0) return 'Sell quantity must be greater than 0.'
    if (sellForm.quantity > holdingToSell.quantity) return 'You cannot sell more than you own.'
    return null
  }, [holdingToSell, sellForm.quantity])

  const submitAddHolding = (event: FormEvent) => {
    event.preventDefault()
    if (!id) return
    if (addValidationError) return

    mutations.createHolding.mutate(
      {
        portfolioId: id,
        coinId: selectedAddCoin.id,
        symbol: selectedAddCoin.symbol,
        name: selectedAddCoin.name,
        quantity: addForm.quantity,
        averageBuyPrice: addForm.buyPrice
      },
      { onSuccess: () => setAddOpen(false) }
    )
  }

  const submitBuy = (event: FormEvent) => {
    event.preventDefault()
    if (!id) return
    if (buyValidationError) return

    mutations.createHolding.mutate(
      {
        portfolioId: id,
        coinId: selectedBuyCoin.id,
        symbol: selectedBuyCoin.symbol,
        name: selectedBuyCoin.name,
        quantity: buyForm.quantity,
        averageBuyPrice: buyForm.purchasePrice
      },
      {
        onSuccess: () => {
            setBuyOpen(false)
          addTransaction({
            type: 'Buy',
            coin: selectedBuyCoin.symbol,
            quantity: buyForm.quantity,
            price: buyForm.purchasePrice,
            dateTime: new Date().toISOString()
          })
        }
      }
    )
  }


  const submitSell = (event: FormEvent) => {
    event.preventDefault()
    if (!id || !holdingToSell) return
    if (sellValidationError) return

    const remainingQty = holdingToSell.quantity - sellForm.quantity
    const soldSymbol = holdingToSell.symbol

    if (remainingQty <= 0) {
      mutations.deleteHolding.mutate(holdingToSell._id, {
        onSuccess: () => {
          setSellOpenForHoldingId(null)
          addTransaction({
            type: 'Sell',
            coin: soldSymbol,
            quantity: sellForm.quantity,
            price: holdingToSell.averageBuyPrice,
            dateTime: new Date().toISOString()
          })
        }
      })
      return
    }


    mutations.updateHolding.mutate(
      {
        id: holdingToSell._id,
        input: {
          quantity: remainingQty,
          averageBuyPrice: holdingToSell.averageBuyPrice
        }
      },
      {
        onSuccess: () => {
          setSellOpenForHoldingId(null)
          addTransaction({
            type: 'Sell',
            coin: soldSymbol,
            quantity: sellForm.quantity,
            price: holdingToSell.averageBuyPrice,
            dateTime: new Date().toISOString()
          })
        }
      }
    )
  }



  if (isLoading) return <Skeleton className="h-96" />
  if (isError || !portfolio) return <EmptyState title="Portfolio unavailable" description="The portfolio could not be loaded." />

  const holdingsCount = portfolio.holdings?.length ?? 0

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-semibold">{portfolio.name}</h2>
          <p className="mt-2 text-sm text-muted">{portfolio.baseCurrency} portfolio performance and holdings.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => setBuyOpen(true)}><Plus size={18} /> Buy</Button>
          <Button variant="secondary" onClick={() => setAddOpen(true)}><Plus size={18} /> Add holding</Button>
        </div>
      </header>

      {mutationError && <EmptyState title="Holding action failed" description="The holding could not be saved. Check the values and try again." />}

      <section className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-muted">Total Investment</p><strong className="mt-2 block text-2xl">{currency(portfolio.summary.totalInvested)}</strong></Card>
        <Card><p className="text-sm text-muted">Current Value</p><strong className="mt-2 block text-2xl">{currency(portfolio.summary.currentValue)}</strong></Card>
        <Card><p className="text-sm text-muted">Total Profit/Loss</p><strong className={`mt-2 block text-2xl ${portfolio.summary.profitLoss >= 0 ? 'text-accent' : 'text-red-300'}`}>{currency(portfolio.summary.profitLoss)}</strong></Card>
        <Card><p className="text-sm text-muted">Number of Holdings</p><strong className="mt-2 block text-2xl">{holdingsCount}</strong></Card>
      </section>

      <Card>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold">Holdings</h3>
        </div>

        {holdingsCount === 0 ? (
          <EmptyState
            title="No holdings yet"
            description="No holdings yet. Click Buy to add your first cryptocurrency."
            action={<Button variant="primary" onClick={() => setBuyOpen(true)}>Buy</Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-3">Coin</th>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Buy Price</th>
                  <th>Current Price</th>
                  <th>Profit/Loss</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings?.map((holding) => {
                  const currentPrice = holding.currentPrice ?? holding.averageBuyPrice // fallback
                  const profitLoss = holding.profitLoss ?? (holding.quantity * (currentPrice - holding.averageBuyPrice))

                  const image = (holding as unknown as HoldingWithMaybeImage).image

                  return (
                    <tr key={holding._id} className="border-t border-white/10">
                      <td className="py-3 font-semibold">
                        <div className="flex items-center gap-2">
                          {image ? (
                            <img src={image} className="h-7 w-7 rounded-sm" alt={holding.name} />
                          ) : (
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-xs font-bold text-black">
                              {toInitials(holding.symbol || holding.name)}
                            </span>
                          )}
                          <span>{holding.name}</span>
                        </div>
                      </td>
                      <td className="text-muted">{holding.symbol}</td>
                      <td>{holding.quantity}</td>
                      <td>{currency(holding.averageBuyPrice)}</td>
                      <td>{currency(currentPrice)}</td>
                      <td className={profitLoss >= 0 ? 'text-accent' : 'text-red-300'}>{currency(profitLoss)}</td>
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-surface text-black border border-yellow-400/40 hover:border-yellow-400/60"
                            onClick={() => {
                              setSellForm({ quantity: 0 })
                              setSellOpenForHoldingId(holding._id)
                            }}
                          >
                            Sell
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            aria-label="Delete holding"
                            onClick={() => mutations.deleteHolding.mutate(holding._id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <h3 className="mb-4 text-base font-semibold">Transaction history</h3>
          <EmptyState title="No transactions yet" description="Buy or sell from the portfolio to create transactions." />

      </Card>

      {/* Buy modal */}
      <Modal open={buyOpen} title="Buy crypto" onClose={() => setBuyOpen(false)}>
        <form className="grid gap-4" onSubmit={submitBuy}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted">Coin</span>
            <select
              className="h-11 w-full rounded-sm border border-white/10 bg-bg px-3 text-sm text-text"
              value={buyForm.coinId}
              onChange={(event) => setBuyForm({ ...buyForm, coinId: event.target.value })}
              required
            >
              {POPULAR_COINS.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.symbol})</option>
              ))}
            </select>
          </label>

          <Input
            label="Quantity"
            type="number"
            step="any"
            value={buyForm.quantity}
            onChange={(event) => setBuyForm({ ...buyForm, quantity: Number(event.target.value) })}
            required
          />

          <Input
            label="Purchase Price"
            type="number"
            step="any"
            value={buyForm.purchasePrice}
            onChange={(event) => setBuyForm({ ...buyForm, purchasePrice: Number(event.target.value) })}
            required
          />

          {buyValidationError && <p className="text-sm text-red-300">{buyValidationError}</p>}
          <Button type="submit" variant="primary" disabled={mutations.createHolding.isLoading || Boolean(buyValidationError)}>Buy</Button>
        </form>
      </Modal>

      {/* Add holding modal */}
      <Modal open={addOpen} title="Add holding" onClose={() => setAddOpen(false)}>
        <form className="grid gap-4" onSubmit={submitAddHolding}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted">Coin</span>
            <select
              className="h-11 w-full rounded-sm border border-white/10 bg-bg px-3 text-sm text-text"
              value={addForm.coinId}
              onChange={(event) => setAddForm({ ...addForm, coinId: event.target.value })}
              required
            >
              {POPULAR_COINS.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.symbol})</option>
              ))}
            </select>
          </label>

          <Input
            label="Quantity"
            type="number"
            step="any"
            value={addForm.quantity}
            onChange={(event) => setAddForm({ ...addForm, quantity: Number(event.target.value) })}
            required
          />

          <Input
            label="Buy Price"
            type="number"
            step="any"
            value={addForm.buyPrice}
            onChange={(event) => setAddForm({ ...addForm, buyPrice: Number(event.target.value) })}
            required
          />

          {addValidationError && <p className="text-sm text-red-300">{addValidationError}</p>}
          {mutations.createHolding.error && <p className="text-sm text-red-300">Could not add holding. Check the values and try again.</p>}
          <Button type="submit" variant="secondary" disabled={mutations.createHolding.isLoading || Boolean(addValidationError)}>Add holding</Button>
        </form>
      </Modal>

      {/* Sell modal */}
      <Modal open={Boolean(sellOpenForHoldingId)} title="Sell crypto" onClose={() => setSellOpenForHoldingId(null)}>
        <form className="grid gap-4" onSubmit={submitSell}>
          {holdingToSell ? (
            <div className="rounded-sm bg-bg p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{holdingToSell.name} <span className="text-muted">({holdingToSell.symbol})</span></span>
                <span className="text-muted">Owned: {holdingToSell.quantity}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">No holding selected.</p>
          )}

          <Input
            label="Quantity to sell"
            type="number"
            step="any"
            value={sellForm.quantity}
            onChange={(event) => setSellForm({ quantity: Number(event.target.value) })}
            required
          />

          {sellValidationError && <p className="text-sm text-red-300">{sellValidationError}</p>}
          <Button
            type="submit"
            variant="secondary"
            className="bg-surface text-black border border-yellow-400/40 hover:border-yellow-400/60"
            disabled={!holdingToSell || mutations.updateHolding.isLoading || Boolean(sellValidationError)}
          >
            Sell
          </Button>
        </form>
      </Modal>
    </div>
  )
}

