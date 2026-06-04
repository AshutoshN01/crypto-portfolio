import { useQuery } from '@tanstack/react-query'
import { getTopCoins } from './marketApi'

export function useTopCoins(limit = 25) {
  return useQuery({ queryKey: ['markets', 'top-coins', limit], queryFn: () => getTopCoins(limit), staleTime: 60_000 })
}
