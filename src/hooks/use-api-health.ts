'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchHealth } from '@/lib/finance-api'

export function useApiHealth() {
  const query = useQuery({
    queryKey: ['api-health'],
    queryFn: fetchHealth,
    refetchInterval: 30_000,
    retry: 0,
    staleTime: 10_000,
  })

  return {
    isHealthy: query.isSuccess,
    isChecking: query.isLoading,
  }
}
