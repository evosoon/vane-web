'use client'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { ChangeBadge, PriceDisplay } from '@/components/ui/ChangeBadge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatAmount } from '@/lib/utils'

interface QuoteCardProps {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  volume: number
  amount: number
  turnoverRate?: number
  peRatio?: number
}

export function QuoteCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  open,
  high,
  low,
  volume,
  amount,
  turnoverRate,
  peRatio,
}: QuoteCardProps) {
  const isPositive = change >= 0

  return (
    <Card>
      <CardHeader
        title={`${name} ${symbol}`}
        icon={isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      />
      <CardBody>
        <div className="flex items-baseline gap-2 mb-3">
          <PriceDisplay value={price} change={change} className="text-3xl" />
          <ChangeBadge value={changePercent} className="text-xs" />
          <span className={`text-xs font-mono ${isPositive ? 'text-rise' : 'text-fall'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-text-3">开盘</span>
            <span className="font-mono text-text-1">{open.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-3">最高</span>
            <span className="font-mono text-rise">{high.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-3">最低</span>
            <span className="font-mono text-fall">{low.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-3">成交量</span>
            <span className="font-mono text-text-1">{formatAmount(volume)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-3">成交额</span>
            <span className="font-mono text-text-1">{formatAmount(amount)}</span>
          </div>
          {turnoverRate !== undefined && (
            <div className="flex justify-between">
              <span className="text-text-3">换手率</span>
              <span className="font-mono text-text-1">{turnoverRate.toFixed(2)}%</span>
            </div>
          )}
          {peRatio !== undefined && (
            <div className="flex justify-between">
              <span className="text-text-3">市盈率</span>
              <span className="font-mono text-text-1">{peRatio.toFixed(2)}</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
