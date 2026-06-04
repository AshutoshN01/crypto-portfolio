import { create } from 'zustand'

export type TransactionType = 'Buy' | 'Sell'

export type LocalTransaction = {
  id: string
  type: TransactionType
  coin: string
  quantity: number
  price: number
  dateTime: string
}

type TransactionState = {
  transactions: LocalTransaction[]
  addTransaction: (tx: Omit<LocalTransaction, 'id'>) => void
  clearTransactions: () => void
}

const STORAGE_KEY = 'cryptodashboard.transactions.v1'

function loadInitialTransactions(): LocalTransaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as LocalTransaction[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export const useTransactionStore = create<TransactionState>((set) => {
  const initial = typeof window !== 'undefined' ? loadInitialTransactions() : []

  return {
    transactions: initial,
    addTransaction: (tx) =>
      set((state) => {
        const next: LocalTransaction[] = [
          {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            ...tx
          },
          ...state.transactions
        ]

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // ignore storage errors
        }

        return { transactions: next }
      }),
    clearTransactions: () => {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore storage errors
      }
      set({ transactions: [] })
    }
  }
})

