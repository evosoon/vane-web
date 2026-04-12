import { create } from 'zustand'

export interface QuoteData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  amount: number
  high: number
  low: number
  open: number
  preClose: number
  timestamp: number
}

interface MarketStore {
  symbol: string
  quotes: Record<string, QuoteData>
  wsStatus: 'connected' | 'disconnected' | 'connecting'
  setSymbol: (symbol: string) => void
  updateQuote: (symbol: string, data: Partial<QuoteData>) => void
  setWsStatus: (status: 'connected' | 'disconnected' | 'connecting') => void
}

export const useMarketStore = create<MarketStore>((set) => ({
  symbol: 'sh600519',
  quotes: {},
  wsStatus: 'disconnected',
  setSymbol: (symbol) => set({ symbol }),
  updateQuote: (symbol, data) =>
    set((state) => ({
      quotes: {
        ...state.quotes,
        [symbol]: { ...state.quotes[symbol], ...data } as QuoteData,
      },
    })),
  setWsStatus: (status) => set({ wsStatus: status }),
}))
