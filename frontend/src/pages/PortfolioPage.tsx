import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Skeleton from '../components/ui/Skeleton'
import { usePortfolioMutations, usePortfolios } from '../features/portfolio/usePortfolioQueries'
import { currency, percent } from '../utils/format'

export default function PortfolioPage() {
  const { data = [], isLoading, isError } = usePortfolios()
  const mutations = usePortfolioMutations()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const mutationError = mutations.createPortfolio.error || mutations.deletePortfolio.error

  const submit = (event: FormEvent) => {
    event.preventDefault()
    mutations.createPortfolio.mutate({ name, baseCurrency: 'USD' }, { onSuccess: () => { setName(''); setOpen(false) } })
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-semibold">Portfolios</h2>
          <p className="mt-2 text-sm text-muted">Create portfolios, track holdings, and inspect performance.</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus size={18} /> New portfolio</Button>
      </header>

      {isLoading && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><Skeleton className="h-40" /><Skeleton className="h-40" /><Skeleton className="h-40" /></div>}
      {isError && <EmptyState title="Could not load portfolios" description="Check your API connection and sign-in state." />}
      {mutationError && <EmptyState title="Portfolio action failed" description="The portfolio could not be saved. Try again in a moment." />}
      {!isLoading && !isError && data.length === 0 && <EmptyState title="No portfolios yet" description="Create your first portfolio to start tracking holdings." action={<Button onClick={() => setOpen(true)}>Create portfolio</Button>} />}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.map((portfolio) => (
          <Card key={portfolio._id} className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link to={`/portfolio/${portfolio._id}`} className="text-lg font-semibold hover:text-primary">{portfolio.name}</Link>
                <p className="text-sm text-muted">{portfolio.holdings?.length ?? 0} holdings</p>
              </div>
              <Button variant="ghost" size="sm" aria-label="Delete portfolio" onClick={() => mutations.deletePortfolio.mutate(portfolio._id)}><Trash2 size={16} /></Button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-muted">Value</p><strong>{currency(portfolio.summary.currentValue)}</strong></div>
              <div><p className="text-muted">P/L</p><strong className={portfolio.summary.profitLoss >= 0 ? 'text-accent' : 'text-red-300'}>{percent(portfolio.summary.profitLossPct)}</strong></div>
            </div>
          </Card>
        ))}
      </section>

      <Modal open={open} title="Create portfolio" onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={submit}>
          <Input label="Portfolio name" value={name} onChange={(event) => setName(event.target.value)} required />
          {mutations.createPortfolio.error && <p className="text-sm text-red-300">Could not create portfolio. Use a unique name and try again.</p>}
          <Button type="submit" disabled={mutations.createPortfolio.isLoading || !name.trim()}>Create</Button>
        </form>
      </Modal>
    </div>
  )
}
