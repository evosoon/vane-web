'use client'

import { usePathname } from 'next/navigation'
import { Search, RefreshCw, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { DataSourceBadge } from '@/components/ui/DataSourceBadge'

const PAGE_TITLES: Record<string, string> = {
  '/': '首页',
  '/emotion': '情绪',
  '/chat': '问股',
  '/settings': '设置',
}

function MarketBadge() {
  const [status, setStatus] = useState<{ label: string; open: boolean }>({
    label: '--',
    open: false,
  })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const day = now.getDay()
      const t = now.getHours() * 100 + now.getMinutes()

      if (day === 0 || day === 6) {
        setStatus({ label: '休市', open: false })
      } else if (t >= 930 && t < 1130) {
        setStatus({ label: '交易中', open: true })
      } else if (t >= 1300 && t < 1500) {
        setStatus({ label: '交易中', open: true })
      } else if (t >= 915 && t < 930) {
        setStatus({ label: '竞价中', open: true })
      } else {
        setStatus({ label: '已收盘', open: false })
      }
    }

    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`text-[9px] font-bold px-[7px] py-[2px] rounded-[10px] ${
        status.open
          ? 'bg-fall-light text-fall'
          : 'bg-bg-2 text-text-3'
      }`}
      suppressHydrationWarning
    >
      {status.label}
    </span>
  )
}

export function AppHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const pageTitle = PAGE_TITLES[pathname] || '首页'

  return (
    <header className="h-header bg-bg-1 border-b border-border-1 flex items-center px-4 gap-[10px] flex-shrink-0 transition-colors duration-200">
      {/* Breadcrumb */}
      <div className="text-xs text-text-3 flex items-center gap-1">
        <span>Vane</span>
        <span className="text-text-4">/</span>
        <span className="text-text-1 font-semibold">{pageTitle}</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-[320px] mx-auto relative">
        <Search className="absolute left-[9px] top-1/2 -translate-y-1/2 text-text-4 pointer-events-none w-[13px] h-[13px]" />
        <input
          placeholder="搜索股票代码或名称 ⌘K"
          className="w-full py-[6px] pl-7 pr-[10px] border-[1.5px] border-border-1 rounded-sm text-xs font-sans bg-bg-2 text-text-1 outline-none transition-all duration-vane placeholder:text-text-4 focus:border-[var(--blue)] focus:bg-bg-1 focus:shadow-[0_0_0_3px_var(--blue-m)]"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-[6px]">
        <MarketBadge />
        <DataSourceBadge />
        <button
          className="w-7 h-7 flex items-center justify-center rounded-sm cursor-pointer text-text-3 border-none bg-transparent transition-all duration-vane hover:bg-bg-2 hover:text-text-1"
          title="刷新"
        >
          <RefreshCw className="w-[14px] h-[14px]" />
        </button>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-sm cursor-pointer text-text-3 border-none bg-transparent transition-all duration-vane hover:bg-bg-2 hover:text-text-1"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="切换主题"
        >
          {mounted && (theme === 'dark' ? (
            <Sun className="w-[14px] h-[14px]" />
          ) : (
            <Moon className="w-[14px] h-[14px]" />
          ))}
        </button>
      </div>
    </header>
  )
}
