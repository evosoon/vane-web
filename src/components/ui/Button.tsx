'use client'

import { cn } from '@/lib/utils'
import { type ReactNode, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  children: ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-3 py-[5px] rounded-sm text-xs font-semibold font-sans cursor-pointer',
        'border-none inline-flex items-center gap-[5px] transition-all duration-vane ease-vane',
        variant === 'primary' &&
          'bg-[var(--blue)] text-white hover:bg-[var(--blue-d)] hover:shadow-[0_2px_8px_rgba(37,99,235,.3)]',
        variant === 'outline' &&
          'bg-transparent text-text-2 border-[1.5px] border-border-1 hover:border-[var(--blue)] hover:text-[var(--blue)]',
        variant === 'ghost' &&
          'bg-transparent text-text-3 hover:bg-bg-2 hover:text-text-1',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
