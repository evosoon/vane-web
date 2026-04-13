'use client'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NewsItemData {
  id: string
  title: string
  summary: string
  source: string
  time: string
  tags?: string[]
}

interface NewsItemProps {
  news: NewsItemData
  onClick?: () => void
}

export function NewsItem({ news, onClick }: NewsItemProps) {
  return (
    <div
      className={cn(
        'px-3 py-2 border-b border-border-1 last:border-b-0',
        'transition-colors duration-150 hover:bg-bg-2',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-[11.5px] font-medium text-text-1 mb-1 line-clamp-2">
            {news.title}
          </h4>
          <p className="text-[10px] text-text-3 mb-1 line-clamp-2">{news.summary}</p>
          <div className="flex items-center gap-2 text-[9px] text-text-4">
            <span>{news.source}</span>
            <span>·</span>
            <span>{news.time}</span>
            {news.tags && news.tags.length > 0 && (
              <>
                <span>·</span>
                <div className="flex gap-1">
                  {news.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-[5px] py-[1px] rounded bg-brand-blue-light text-brand-blue font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface NewsListProps {
  news: NewsItemData[]
  title?: string
}

export function NewsList({ news, title = '快讯' }: NewsListProps) {
  return (
    <Card>
      <CardHeader title={title} icon={<Newspaper className="w-3 h-3" />} />
      <CardBody noPadding>
        <div className="max-h-[400px] overflow-y-auto">
          {news.map((item) => (
            <NewsItem key={item.id} news={item} />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
