import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createHolding, createPortfolio, createTransaction, deleteHolding, deletePortfolio, getPortfolio, listPortfolios, listTransactions, updateHolding, updatePortfolio } from './portfolioApi'

export const portfolioKeys = {
  all: ['portfolios'] as const,
  detail: (id: string) => ['portfolio', id] as const,
  transactions: (portfolioId?: string, type?: string) => ['transactions', portfolioId, type] as const
}

export function usePortfolios() {
  return useQuery({ queryKey: portfolioKeys.all, queryFn: listPortfolios })
}

export function usePortfolio(id?: string) {
  return useQuery({ queryKey: portfolioKeys.detail(id ?? ''), queryFn: () => getPortfolio(id!), enabled: Boolean(id) })
}

export function usePortfolioMutations(portfolioId?: string) {
  const queryClient = useQueryClient()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: portfolioKeys.all })
    if (portfolioId) queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(portfolioId) })
  }

  return {
    createPortfolio: useMutation({ mutationFn: createPortfolio, onSuccess: invalidate }),
    updatePortfolio: useMutation({ mutationFn: ({ id, input }: { id: string; input: { name?: string; baseCurrency?: string; description?: string } }) => updatePortfolio(id, input), onSuccess: invalidate }),
    deletePortfolio: useMutation({ mutationFn: deletePortfolio, onSuccess: invalidate }),
    createHolding: useMutation({ mutationFn: createHolding, onSuccess: invalidate }),
    updateHolding: useMutation({ mutationFn: ({ id, input }: { id: string; input: { quantity?: number; averageBuyPrice?: number; currentPrice?: number } }) => updateHolding(id, input), onSuccess: invalidate }),
    deleteHolding: useMutation({ mutationFn: deleteHolding, onSuccess: invalidate }),
    createTransaction: useMutation({ mutationFn: createTransaction, onSuccess: invalidate })
  }
}

export function useTransactions(portfolioId?: string, type?: string) {
  return useQuery({ queryKey: portfolioKeys.transactions(portfolioId, type), queryFn: () => listTransactions({ portfolioId, type }) })
}
