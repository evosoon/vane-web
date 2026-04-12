'use client'

import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-1 border border-border-1 rounded-md shadow-ss overflow-hidden min-w-0',
        'transition-[background-color,border-color,box-shadow] duration-200',
        hover && 'hover:shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  icon?: ReactNode
  subtitle?: string
  actions?: ReactNode
  className?: string
}

export function CardHeader({ title, icon, subtitle, actions, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-3 py-2 border-b border-border-1 transition-colors duration-200',
        className
      )}
    >
      <span className="text-[11.5px] font-semibold text-text-1 flex items-center gap-[5px]">
        {icon && <span className="text-text-3">{icon}</span>}
        {title}
      </span>
      <div className="flex items-center gap-1">
        {subtitle && <span className="text-[10px] text-text-3">{subtitle}</span>}
        {actions}
      </div>
    </div>
  )
}

interface CardBodyProps {
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export function CardBody({ children, className, noPadding }: CardBodyProps) {
  return (
    <div className={cn(noPadding ? '' : 'px-3 py-[10px]', className)}>
      {children}
    </div>
  )
}
