'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchQuote, type QuoteItem } from '@/lib/finance-api'
import { mockQuote } from '@/lib/mock-data'

function transformQuote(item: QuoteItem) {
  return {
    symbol: item.symbol,
    name: item.name,
    price: item.price,
    change: item.change_amount,
    changePercent: item.change_percent,
    open: item.open,
    high: item.high,
    low: item.low,
    volume: item.volume,
    amount: item.amount,
    turnoverRate: item.turnover_rate,
    peRatio: item.pe_ratio,
  }
}

export function useQuote(symbol: string) {
  const query = useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => fetchQuote(symbol),
    staleTime: 10_000,
    refetchInterval: 15_000,
    retry: 1,
  })

  if (query.data) {
    const item = query.data.quotes[0]
    return { data: item ? transformQuote(item) : mockQuote, isMock: !item, isLoading: false }
  }

  return { data: mockQuote, isMock: true, isLoading: query.isLoading }
}
