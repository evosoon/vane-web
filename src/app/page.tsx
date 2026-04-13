'use client'

import { QuoteCard } from '@/components/finance/QuoteCard'
import { NewsList } from '@/components/finance/NewsItem'
import KLineChart from '@/components/finance/KLineChart'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { BarChart3, TrendingUp } from 'lucide-react'
import { useQuote } from '@/hooks/use-quote'
import { useKline } from '@/hooks/use-kline'
import { useNews } from '@/hooks/use-news'
import { useMarketStore } from '@/stores/market'

export default function Home() {
  const [period, setPeriod] = useState('day')
  const [adjust, setAdjust] = useState('qfq')

  const symbol = useMarketStore((s) => s.symbol)
  const quote = useQuote(symbol)
  const kline = useKline(symbol, period, adjust)
  const news = useNews()

  return (
    <main className="min-h-screen p-6 pb-24">
      <div className="max-w-[1400px] mx-auto space-y-4 animate-fade-up">
            {/* Quote Card */}
            <QuoteCard {...quote.data} />

            {/* Chart + News */}
            <div className="grid grid-cols-[1fr_280px] gap-4">
              {/* K-Line Chart */}
              <Card>
                <CardHeader
                  title="K线图"
                  icon={<BarChart3 className="w-3 h-3" />}
                  actions={
                    <div className="flex items-center gap-2">
                      <Tabs
                        tabs={[
                          { key: 'day', label: '日K' },
                          { key: 'week', label: '周K' },
                          { key: 'month', label: '月K' },
                        ]}
                        active={period}
                        onChange={setPeriod}
                      />
                      <Tabs
                        tabs={[
                          { key: 'qfq', label: '前复权' },
                          { key: 'hfq', label: '后复权' },
                          { key: 'none', label: '不复权' },
                        ]}
                        active={adjust}
                        onChange={setAdjust}
                      />
                    </div>
                  }
                />
                <CardBody>
                  <KLineChart data={kline.data} />
                </CardBody>
              </Card>

              {/* News */}
              <NewsList news={news.data} />
            </div>

            {/* Analysis Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader
                  title="综合评估"
                  icon={<TrendingUp className="w-3 h-3" />}
                />
                <CardBody>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-3">技术面</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-bg-2 rounded-full overflow-hidden">
                          <div className="h-full bg-rise w-[75%]" />
                        </div>
                        <span className="text-xs font-semibold text-rise">看多</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-3">资金面</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-bg-2 rounded-full overflow-hidden">
                          <div className="h-full bg-rise w-[60%]" />
                        </div>
                        <span className="text-xs font-semibold text-rise">偏多</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-3">基本面</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-bg-2 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-blue w-[85%]" />
                        </div>
                        <span className="text-xs font-semibold text-brand-blue">优秀</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader title="AI 摘要" />
                <CardBody>
                  <p className="text-xs text-text-2 leading-relaxed">
                    贵州茅台当前处于上升通道，均线多头排列，MACD金叉信号确认。近3日成交量温和放大，主力资金持续净流入。基本面优秀，业绩稳健增长。综合评估：<span className="text-rise font-semibold">看多</span>，建议适当持有。
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" className="text-[10px] px-2 py-1">
                      查看详情
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
    </main>
  )
}
