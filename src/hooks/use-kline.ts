'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchKline, type KlineBar } from '@/lib/finance-api'
import { mockKlineData } from '@/lib/mock-data'

export function useKline(symbol: string, period = 'day', adjust = 'qfq') {
  const query = useQuery({
    queryKey: ['kline', symbol, period, adjust],
    queryFn: () => fetchKline(symbol, period, adjust),
    staleTime: 60_000,
    retry: 1,
  })

  if (query.data) {
    return { data: query.data.bars, isMock: false, isLoading: false }
  }

  return { data: mockKlineData as KlineBar[], isMock: true, isLoading: query.isLoading }
}
