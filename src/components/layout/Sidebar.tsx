'use client'

import { TrendingUp, Activity, MessageSquare, Settings } from 'lucide-react'
import { NavItem } from './NavItem'

export function Sidebar() {
  return (
    <aside className="w-sidebar bg-transparent flex flex-col flex-shrink-0 z-[100] px-2 py-[10px] gap-1">
      {/* Logo */}
      <div className="flex flex-col items-center gap-[2px] px-0 py-2 pb-[10px] mb-[2px]">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[var(--blue)] to-[#4F46E5] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(37,99,235,.3)]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </div>
        <span className="text-[10px] font-bold text-text-1 tracking-tight mt-[3px]">
          Vane
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-[2px] overflow-visible">
        <NavItem href="/" icon={TrendingUp} label="个股" />
        <NavItem href="/emotion" icon={Activity} label="情绪" />
        <NavItem href="/chat" icon={MessageSquare} label="问股" />
      </nav>

      {/* Divider */}
      <div className="h-px bg-border-1 mx-1 my-1" />

      {/* Settings */}
      <NavItem href="/settings" icon={Settings} label="设置" />

      {/* Model Selector */}
      <div className="flex flex-col items-center gap-1 px-1 py-2 mt-1">
        <div className="flex items-center gap-[6px]">
          <div className="w-[6px] h-[6px] rounded-full bg-green animate-pulse" />
          <span className="text-[9px] font-semibold text-text-3">GPT-4</span>
        </div>
      </div>
    </aside>
  )
}
