'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  TrendingUp,
  Activity,
  MessageSquare,
  Search,
  RefreshCw,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMarketStore } from '@/stores/market'
import { useApiHealth } from '@/hooks/use-api-health'

const NAV_ITEMS = [
  { href: '/', icon: TrendingUp, label: '个股' },
  { href: '/emotion', icon: Activity, label: '情绪' },
  { href: '/chat', icon: MessageSquare, label: '问股' },
]

function parseSymbol(input: string): string | null {
  const trimmed = input.trim()
  // sh600519 / sz000001 format
  if (/^(sh|sz)\d{6}$/i.test(trimmed)) return trimmed.toLowerCase()
  // bare 6-digit code
  if (/^\d{6}$/.test(trimmed)) {
    if (trimmed.startsWith('6')) return `sh${trimmed}`
    if (trimmed.startsWith('0') || trimmed.startsWith('3')) return `sz${trimmed}`
  }
  return null
}

function MarketBadge() {
  const [status, setStatus] = useState({ label: '--', open: false })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const day = now.getDay()
      const t = now.getHours() * 100 + now.getMinutes()
      if (day === 0 || day === 6) {
        setStatus({ label: '休市', open: false })
      } else if ((t >= 930 && t < 1130) || (t >= 1300 && t < 1500)) {
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
    <div
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold whitespace-nowrap transition-all',
        status.open ? 'text-fall bg-fall-light' : 'text-text-3 bg-bg-2'
      )}
      suppressHydrationWarning
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', status.open ? 'bg-fall animate-pulse' : 'bg-text-4')} />
      {status.label}
    </div>
  )
}

export function Dock() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const queryClient = useQueryClient()
  const [searchOpen, setSearchOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchAreaRef = useRef<HTMLDivElement>(null)
  const setSymbol = useMarketStore((s) => s.setSymbol)
  const { isHealthy, isChecking } = useApiHealth()
  const isMock = !isChecking && !isHealthy

  // Global keyboard shortcuts: ⌘K (search), ⌘. (theme), ⌘R (refresh)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return

      if (e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => {
          if (!prev) setTimeout(() => searchInputRef.current?.focus(), 50)
          return !prev
        })
      }

      if (e.key === '.') {
        e.preventDefault()
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }

      if (e.key === 'r') {
        e.preventDefault()
        handleRefresh()
      }
    }

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) setSearchOpen(false)
    }

    document.addEventListener('keydown', handler)
    document.addEventListener('keydown', escHandler)
    return () => {
      document.removeEventListener('keydown', handler)
      document.removeEventListener('keydown', escHandler)
    }
  }, [searchOpen, theme, setTheme])

  // Click outside to close search
  useEffect(() => {
    if (!searchOpen) return
    const handler = (e: MouseEvent) => {
      if (searchAreaRef.current && !searchAreaRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [searchOpen])

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries()
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 600)
  }, [queryClient])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
  }, [])

  const handleSearchSubmit = useCallback((value: string) => {
    const symbol = parseSymbol(value)
    if (!symbol) return
    setSymbol(symbol)
    setSearchOpen(false)
    if (pathname !== '/') router.push('/')
  }, [setSymbol, pathname, router])

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-1.5',
          'bg-bg-1/80 backdrop-blur-xl',
          isMock ? 'border border-brand-orange' : 'border border-border-1',
          'rounded-2xl',
          'shadow-sl',
          'transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]',
        )}
      >
        {/* Nav items */}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl',
                'text-[11px] font-semibold',
                'transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)]',
                isActive
                  ? 'bg-brand-blue text-white shadow-[0_2px_8px_rgba(37,99,235,.35)]'
                  : 'text-text-3 hover:text-text-1 hover:bg-bg-2'
              )}
            >
              <item.icon className="w-4 h-4" strokeWidth={isActive ? 2.2 : 1.8} />
              <span
                className={cn(
                  'overflow-hidden whitespace-nowrap transition-all duration-200',
                  isActive ? 'w-auto max-w-[40px] opacity-100' : 'w-0 max-w-0 opacity-0'
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}

        {/* Divider */}
        <div className="w-px h-5 bg-border-1 mx-1" />

        {/* Search */}
        <div className="relative flex items-center" ref={searchAreaRef}>
          <button
            onClick={() => {
              setSearchOpen(!searchOpen)
              if (!searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50)
            }}
            className={cn(
              'flex items-center gap-1.5 py-1.5 rounded-xl transition-all duration-200',
              searchOpen
                ? 'text-brand-blue'
                : 'text-text-3 hover:text-text-1 hover:bg-bg-2 px-3'
            )}
          >
            {searchOpen ? (
              <X className="w-4 h-4 ml-1.5" strokeWidth={1.8} />
            ) : (
              <>
                <Search className="w-4 h-4" strokeWidth={1.8} />
                <span className="text-text-4 font-mono text-[10px]">⌘K</span>
              </>
            )}
          </button>

          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]',
              searchOpen ? 'w-48 opacity-100 ml-1' : 'w-0 opacity-0 ml-0'
            )}
          >
            <input
              ref={searchInputRef}
              placeholder="输入股票代码，回车跳转"
              className="w-full px-3 py-1.5 rounded-xl text-[11px] bg-bg-2 text-text-1 border border-border-1 outline-none placeholder:text-text-4 focus:border-brand-blue"
              onKeyDown={(e) => {
                if (e.key === 'Escape') closeSearch()
                if (e.key === 'Enter') {
                  handleSearchSubmit((e.target as HTMLInputElement).value)
                }
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-border-1 mx-1" />

        {/* Market status */}
        <MarketBadge />

        {/* Refresh */}
        <button
          className="p-1.5 rounded-xl text-text-3 hover:text-text-1 hover:bg-bg-2 transition-all"
          title="刷新数据 ⌘R"
          onClick={handleRefresh}
        >
          <RefreshCw className={cn('w-4 h-4 transition-transform', refreshing && 'animate-spin')} strokeWidth={1.8} />
        </button>

        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            'p-1.5 rounded-xl transition-all duration-200',
            pathname === '/settings'
              ? 'bg-brand-blue text-white shadow-[0_2px_8px_rgba(37,99,235,.35)]'
              : 'text-text-3 hover:text-text-1 hover:bg-bg-2'
          )}
        >
          <Settings className="w-4 h-4" strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  )
}
