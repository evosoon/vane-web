'use client'

import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: Array<{ key: string; label: string }>
  active: string
  onChange: (key: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('inline-flex gap-px bg-bg-2 p-[2px] rounded-sm', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            'px-[9px] py-[3px] text-[11px] font-medium rounded-[6px] cursor-pointer',
            'border-none font-sans transition-all duration-vane ease-vane',
            active === tab.key
              ? 'bg-bg-1 text-text-1 shadow-ss font-semibold'
              : 'text-text-3 bg-transparent hover:text-text-1'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
