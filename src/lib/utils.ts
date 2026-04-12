import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAmount(yuan: number): string {
  if (yuan >= 1e12) return `${(yuan / 1e12).toFixed(2)}万亿`
  if (yuan >= 1e8) return `${(yuan / 1e8).toFixed(2)}亿`
  if (yuan >= 1e4) return `${(yuan / 1e4).toFixed(2)}万`
  return `${yuan.toFixed(0)}`
}

export function formatMarketCap(yi: number): string {
  if (yi >= 1e4) return `${(yi / 1e4).toFixed(2)}万亿`
  if (yi >= 1) return `${yi.toFixed(2)}亿`
  return `${(yi * 1e4).toFixed(0)}万`
}
