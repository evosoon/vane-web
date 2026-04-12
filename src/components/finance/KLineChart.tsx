'use client'

import { useEffect, useRef, useCallback } from 'react'
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  ColorType,
  CrosshairMode,
  type CandlestickData,
  type Time,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
} from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface KLineChartProps {
  data: Array<{
    date: string
    open: number
    close: number
    high: number
    low: number
    volume: number
  }>
  className?: string
}

function getChartColors(isDark: boolean) {
  return {
    background: isDark ? '#161B26' : '#FFFFFF',
    text: isDark ? '#6678A0' : '#7B8496',
    grid: isDark ? '#2A3347' : '#E2E5EA',
    border: isDark ? '#2A3347' : '#E2E5EA',
    crosshair: isDark ? '#6678A0' : '#7B8496',
    upColor: '#E5334B',
    downColor: '#0DB070',
    volumeUp: 'rgba(229,51,75,0.4)',
    volumeDown: 'rgba(13,176,112,0.4)',
  }
}

export default function KLineChart({ data, className }: KLineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  const initChart = useCallback(() => {
    if (!containerRef.current) return

    if (chartRef.current) {
      try {
        chartRef.current.remove()
      } catch (e) {
        // Chart already disposed, ignore
      }
      chartRef.current = null
    }

    const colors = getChartColors(isDark)

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: colors.grid, style: 1 },
        horzLines: { color: colors.grid, style: 1 },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: colors.crosshair, width: 1, style: 3 },
        horzLine: { color: colors.crosshair, width: 1, style: 3 },
      },
      rightPriceScale: {
        borderColor: colors.border,
        scaleMargins: { top: 0.1, bottom: 0.25 },
      },
      timeScale: {
        borderColor: colors.border,
        timeVisible: false,
        rightOffset: 3,
        minBarSpacing: 3,
      },
      handleScroll: true,
      handleScale: true,
    })

    // Candlestick series (v5 API)
    const candles = chart.addSeries(CandlestickSeries, {
      upColor: colors.upColor,
      downColor: colors.downColor,
      borderUpColor: colors.upColor,
      borderDownColor: colors.downColor,
      wickUpColor: colors.upColor,
      wickDownColor: colors.downColor,
    })

    // Volume series (v5 API)
    const volumes = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    })

    chart.priceScale('volume').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    })

    // Set data
    if (data.length > 0) {
      const candleData: CandlestickData<Time>[] = data.map((d) => ({
        time: d.date as Time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }))

      const volumeData = data.map((d) => ({
        time: d.date as Time,
        value: d.volume,
        color: d.close >= d.open ? colors.volumeUp : colors.volumeDown,
      }))

      candles.setData(candleData)
      volumes.setData(volumeData)

      // MA lines
      const addMA = (period: number, color: string) => {
        if (data.length < period) return
        const maData: Array<{ time: Time; value: number }> = []
        for (let i = period - 1; i < data.length; i++) {
          let sum = 0
          for (let j = i - period + 1; j <= i; j++) sum += data[j].close
          maData.push({ time: data[i].date as Time, value: sum / period })
        }
        const maSeries = chart.addSeries(LineSeries, {
          color,
          lineWidth: 1,
          priceLineVisible: false,
          lastValueVisible: false,
        })
        maSeries.setData(maData)
      }

      addMA(5, '#3370FF')
      addMA(10, '#FF9500')
      addMA(20, '#8B5CF6')

      chart.timeScale().fitContent()
    }

    chartRef.current = chart

    // Resize observer
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        chart.applyOptions({ width, height })
      }
    })
    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      chart.remove()
    }
  }, [isDark, data])

  useEffect(() => {
    const cleanup = initChart()
    return () => cleanup?.()
  }, [initChart])

  return (
    <div ref={containerRef} className={cn('w-full h-[350px]', className)} />
  )
}
