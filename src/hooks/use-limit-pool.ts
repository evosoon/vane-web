'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchLimitPool, type LimitStock as ApiLimitStock } from '@/lib/finance-api'
import { mockLimitUpStocks, mockLimitDownStocks } from '@/lib/mock-data'
import { formatAmount } from '@/lib/utils'

export interface LimitStockDisplay {
  symbol: string
  name: string
  price: number
  changePercent: number
  amount: number
  turnoverRate: number
  amountDisplay: string
}

function transformStock(s: ApiLimitStock): LimitStockDisplay {
  return {
    symbol: s.symbol,
    name: s.name,
    price: s.price,
    changePercent: s.change_percent,
    amount: s.amount,
    turnoverRate: s.turnover_rate,
    amountDisplay: formatAmount(s.amount),
  }
}

function toDisplay(mock: typeof mockLimitUpStocks): LimitStockDisplay[] {
  return mock.map((s) => ({
    ...s,
    amountDisplay: formatAmount(s.amount),
  }))
}

export function useLimitPool(type: 'up' | 'down', page = 1, pageSize = 20) {
  const query = useQuery({
    queryKey: ['limit-pool', type, page, pageSize],
    queryFn: () => fetchLimitPool(type, page, pageSize),
    staleTime: 30_000,
    retry: 1,
  })

  if (query.data) {
    return {
      data: query.data.stocks.map(transformStock),
      total: query.data.total,
      isMock: false,
      isLoading: false,
    }
  }

  const mockData = type === 'up' ? mockLimitUpStocks : mockLimitDownStocks
  return {
    data: toDisplay(mockData),
    total: mockData.length,
    isMock: true,
    isLoading: query.isLoading,
  }
}
