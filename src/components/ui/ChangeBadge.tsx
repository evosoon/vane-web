'use client'

import { cn } from '@/lib/utils'

interface ChangeBadgeProps {
  value: number
  className?: string
}

export function ChangeBadge({ value, className }: ChangeBadgeProps) {
  const isPositive = value >= 0

  return (
    <span
      className={cn(
        'inline-block px-[6px] py-[1px] rounded font-mono text-[10.5px] font-bold',
        isPositive ? 'bg-rise-light text-rise' : 'bg-fall-light text-fall',
        className
      )}
    >
      {isPositive ? '+' : ''}
      {value.toFixed(2)}%
    </span>
  )
}

interface PriceDisplayProps {
  value: number
  change: number
  className?: string
}

export function PriceDisplay({ value, change, className }: PriceDisplayProps) {
  const isPositive = change >= 0

  return (
    <span
      className={cn(
        'font-mono font-bold',
        isPositive ? 'text-rise' : 'text-fall',
        className
      )}
    >
      {value.toFixed(2)}
    </span>
  )
}
