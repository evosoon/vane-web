import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WatchlistItem {
  symbol: string
  name: string
  addedAt: number
}

interface WatchlistStore {
  stocks: WatchlistItem[]
  add: (stock: Omit<WatchlistItem, 'addedAt'>) => void
  remove: (symbol: string) => void
  has: (symbol: string) => boolean
  reorder: (from: number, to: number) => void
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      stocks: [],
      add: (stock) =>
        set((state) => {
          if (state.stocks.some((s) => s.symbol === stock.symbol)) {
            return state
          }
          return {
            stocks: [...state.stocks, { ...stock, addedAt: Date.now() }],
          }
        }),
      remove: (symbol) =>
        set((state) => ({
          stocks: state.stocks.filter((s) => s.symbol !== symbol),
        })),
      has: (symbol) => get().stocks.some((s) => s.symbol === symbol),
      reorder: (from, to) =>
        set((state) => {
          const stocks = [...state.stocks]
          const [removed] = stocks.splice(from, 1)
          stocks.splice(to, 0, removed)
          return { stocks }
        }),
    }),
    {
      name: 'vane-watchlist',
    }
  )
)
