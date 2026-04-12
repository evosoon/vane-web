import { create } from 'zustand'

export type Period = 'day' | 'week' | 'month'
export type Adjust = 'qfq' | 'hfq' | 'none'

interface ChartStore {
  period: Period
  adjust: Adjust
  dayRange: number
  indicators: {
    ma: boolean
    boll: boolean
    macd: boolean
    rsi: boolean
    kdj: boolean
  }
  setPeriod: (period: Period) => void
  setAdjust: (adjust: Adjust) => void
  setDayRange: (range: number) => void
  toggleIndicator: (indicator: keyof ChartStore['indicators']) => void
}

export const useChartStore = create<ChartStore>((set) => ({
  period: 'day',
  adjust: 'qfq',
  dayRange: 60,
  indicators: {
    ma: true,
    boll: false,
    macd: true,
    rsi: false,
    kdj: false,
  },
  setPeriod: (period) => set({ period }),
  setAdjust: (adjust) => set({ adjust }),
  setDayRange: (range) => set({ dayRange: range }),
  toggleIndicator: (indicator) =>
    set((state) => ({
      indicators: {
        ...state.indicators,
        [indicator]: !state.indicators[indicator],
      },
    })),
}))
