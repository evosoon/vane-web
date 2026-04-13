'use client'

import { useEffect, useState } from 'react'

export type MarketStatus = 'trading' | 'lunch' | 'auction' | 'closed'

interface MarketStatusInfo {
  status: MarketStatus
  label: string
  isOpen: boolean
}

export function useMarketStatus(): MarketStatusInfo {
  const [info, setInfo] = useState<MarketStatusInfo>({
    status: 'closed',
    label: '--',
    isOpen: false,
  })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const day = now.getDay()
      const t = now.getHours() * 60 + now.getMinutes()

      if (day === 0 || day === 6) {
        setInfo({ status: 'closed', label: '休市', isOpen: false })
      } else if (t >= 555 && t < 570) {
        setInfo({ status: 'auction', label: '竞价中', isOpen: true })
      } else if (t >= 570 && t < 690) {
        setInfo({ status: 'trading', label: '交易中', isOpen: true })
      } else if (t >= 690 && t < 780) {
        setInfo({ status: 'lunch', label: '午休', isOpen: false })
      } else if (t >= 780 && t <= 900) {
        setInfo({ status: 'trading', label: '交易中', isOpen: true })
      } else if (t < 570) {
        setInfo({ status: 'closed', label: '盘前', isOpen: false })
      } else {
        setInfo({ status: 'closed', label: '已收盘', isOpen: false })
      }
    }

    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return info
}
