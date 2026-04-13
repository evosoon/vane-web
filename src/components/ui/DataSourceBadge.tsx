'use client'

import { useApiHealth } from '@/hooks/use-api-health'

export function DataSourceBadge() {
  const { isHealthy, isChecking } = useApiHealth()

  if (isChecking) {
    return (
      <span className="text-[9px] font-bold px-[7px] py-[2px] rounded-[10px] bg-bg-2 text-text-4">
        --
      </span>
    )
  }

  return isHealthy ? (
    <span className="text-[9px] font-bold px-[7px] py-[2px] rounded-[10px] bg-fall-light text-fall inline-flex items-center gap-[3px]">
      <span className="inline-block w-[5px] h-[5px] rounded-full bg-fall" />
      实时
    </span>
  ) : (
    <span className="text-[9px] font-bold px-[7px] py-[2px] rounded-[10px] bg-brand-orange-light text-brand-orange inline-flex items-center gap-[3px]">
      <span className="inline-block w-[5px] h-[5px] rounded-full bg-brand-orange" />
      模拟
    </span>
  )
}
