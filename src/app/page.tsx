'use client'

import { QuoteCard } from '@/components/finance/QuoteCard'
import { NewsList } from '@/components/finance/NewsItem'
import KLineChart from '@/components/finance/KLineChart'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { BarChart3, TrendingUp } from 'lucide-react'

// Mock data
const mockQuote = {
  symbol: 'sh600519',
  name: '贵州茅台',
  price: 1678.50,
  change: 23.80,
  changePercent: 1.44,
  open: 1655.00,
  high: 1682.00,
  low: 1650.00,
  volume: 1234567,
  amount: 2056789000,
  turnoverRate: 0.98,
  peRatio: 32.5,
}

const mockKlineData = Array.from({ length: 60 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (60 - i))
  const base = 1650 + Math.random() * 50
  return {
    date: date.toISOString().split('T')[0],
    open: base,
    close: base + (Math.random() - 0.5) * 20,
    high: base + Math.random() * 30,
    low: base - Math.random() * 20,
    volume: Math.floor(Math.random() * 2000000),
  }
})

const mockNews = [
  {
    id: '1',
    title: '贵州茅台发布2024年度业绩快报，营收同比增长12.3%',
    summary: '公司实现营业收入1456亿元，净利润达到728亿元，超市场预期。',
    source: '证券时报',
    time: '10:32',
    tags: ['业绩', '白酒'],
  },
  {
    id: '2',
    title: 'A股三大指数集体收涨，沪指涨0.8%站上3100点',
    summary: '两市成交额突破8000亿元，北向资金净流入82亿元。',
    source: '财联社',
    time: '09:15',
    tags: ['大盘'],
  },
  {
    id: '3',
    title: '科技板块持续活跃，AI算力概念股掀涨停潮',
    summary: '多只AI算力概念股涨停，板块整体涨幅超过5%。',
    source: '东方财富',
    time: '08:45',
    tags: ['科技', 'AI'],
  },
]

export default function Home() {
  const [period, setPeriod] = useState('day')
  const [adjust, setAdjust] = useState('qfq')

  return (
    <main className="min-h-screen p-6 pb-24">
      <div className="max-w-[1400px] mx-auto space-y-4 animate-fade-up">
            {/* Quote Card */}
            <QuoteCard {...mockQuote} />

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
                  <KLineChart data={mockKlineData} />
                </CardBody>
              </Card>

              {/* News */}
              <NewsList news={mockNews} />
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
