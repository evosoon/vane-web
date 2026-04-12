'use client'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Activity } from 'lucide-react'

interface EmotionGaugeProps {
  value: number // 0-100
  label: string
}

export function EmotionGauge({ value, label }: EmotionGaugeProps) {
  const angle = (value / 100) * 180 - 90
  const color =
    value >= 80
      ? '#E5334B'
      : value >= 60
      ? '#FF9500'
      : value >= 40
      ? '#2563EB'
      : value >= 20
      ? '#0DB070'
      : '#6678A0'

  return (
    <Card className="w-[200px]">
      <CardHeader title="情绪指数" icon={<Activity className="w-3 h-3" />} />
      <CardBody className="flex flex-col items-center py-4">
        <div className="relative w-[140px] h-[70px]">
          <svg viewBox="0 0 140 70" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 10 65 A 60 60 0 0 1 130 65"
              fill="none"
              stroke="var(--bg2)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Value arc */}
            <path
              d="M 10 65 A 60 60 0 0 1 130 65"
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 188.5} 188.5`}
              className="transition-all duration-500"
            />
            {/* Needle */}
            <line
              x1="70"
              y1="65"
              x2="70"
              y2="20"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${angle} 70 65)`}
              className="transition-transform duration-500"
            />
            <circle cx="70" cy="65" r="4" fill={color} />
          </svg>
        </div>
        <div className="text-center mt-2">
          <div className="text-2xl font-bold font-mono" style={{ color }}>
            {value}
          </div>
          <div className="text-[10px] text-text-3 mt-1">{label}</div>
        </div>
      </CardBody>
    </Card>
  )
}
