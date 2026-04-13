'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchNews, type NewsItem as ApiNewsItem } from '@/lib/finance-api'
import { mockNews } from '@/lib/mock-data'

export interface NewsItemDisplay {
  id: string
  title: string
  summary: string
  source: string
  time: string
  tags: string[]
}

function transformNews(item: ApiNewsItem): NewsItemDisplay {
  return {
    id: item.id,
    title: item.title,
    summary: item.digest,
    source: item.source,
    time: item.time,
    tags: [],
  }
}

export function useNews(page = 1, pageSize = 15) {
  const query = useQuery({
    queryKey: ['news', page, pageSize],
    queryFn: () => fetchNews(page, pageSize),
    staleTime: 60_000,
    retry: 1,
  })

  if (query.data) {
    return {
      data: query.data.news.map(transformNews),
      isMock: false,
      isLoading: false,
    }
  }

  return { data: mockNews, isMock: true, isLoading: query.isLoading }
}
