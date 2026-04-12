'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  TrendingUp,
  Activity,
  MessageSquare,
  Search,
  RefreshCw,
  Sun,
  Moon,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', icon: TrendingUp, label: '个股' },
  { href: '/emotion', icon: Activity, label: '情绪' },
  { href: '/chat', icon: MessageSquare, label: '问股' },
]

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
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-all',
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
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setMounted(true), [])

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => {
          if (!prev) {
            setTimeout(() => searchInputRef.current?.focus(), 50)
          }
          return !prev
        })
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [searchOpen])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
  }, [])

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-1.5',
          'bg-bg-1/80 backdrop-blur-xl',
          'border border-border-1 rounded-2xl',
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
        <div className="relative flex items-center">
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
              placeholder="搜索股票代码或名称..."
              className="w-full px-3 py-1.5 rounded-xl text-[11px] bg-bg-2 text-text-1 border border-border-1 outline-none placeholder:text-text-4 focus:border-brand-blue"
              onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-border-1 mx-1" />

        {/* Market status */}
        <MarketBadge />

        {/* Refresh */}
        <button className="p-1.5 rounded-xl text-text-3 hover:text-text-1 hover:bg-bg-2 transition-all" title="刷新">
          <RefreshCw className="w-4 h-4" strokeWidth={1.8} />
        </button>

        {/* Theme toggle */}
        <button
          className="p-1.5 rounded-xl text-text-3 hover:text-text-1 hover:bg-bg-2 transition-all"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="切换主题"
        >
          {mounted && (theme === 'dark' ? (
            <Sun className="w-4 h-4" strokeWidth={1.8} />
          ) : (
            <Moon className="w-4 h-4" strokeWidth={1.8} />
          ))}
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
