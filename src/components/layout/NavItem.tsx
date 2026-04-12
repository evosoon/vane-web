'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface NavItemProps {
  href: string
  icon: LucideIcon
  label: string
  badge?: number
}

export function NavItem({ href, icon: Icon, label, badge }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center gap-[3px] px-1 py-[7px] rounded-xl',
        'text-[9px] font-semibold transition-all duration-vane ease-vane',
        'border border-transparent relative tracking-wide',
        'hover:bg-bg-1 hover:text-text-1 hover:border-border-1 hover:shadow-ss',
        isActive
          ? 'bg-[var(--blue-l)] text-[var(--blue)] border-[rgba(37,99,235,.2)] shadow-[0_2px_8px_rgba(37,99,235,.1)]'
          : 'text-text-3'
      )}
    >
      <Icon className="w-[18px] h-[18px] stroke-[1.6] transition-transform duration-vane hover:scale-105" />
      <span className="leading-none">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-1 right-1 flex items-center justify-center min-w-[14px] h-[14px] px-[3px] text-[8px] font-bold bg-rise text-white rounded-full">
          {badge}
        </span>
      )}
    </Link>
  )
}
