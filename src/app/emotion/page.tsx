'use client'

import { EmotionGauge } from '@/components/finance/EmotionGauge'
import { LimitPoolTable } from '@/components/finance/LimitPoolTable'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { useState } from 'react'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import { useLimitPool } from '@/hooks/use-limit-pool'

export default function EmotionPage() {
  const [limitType, setLimitType] = useState<'up' | 'down'>('up')

  const limitUp = useLimitPool('up')
  const limitDown = useLimitPool('down')
  const current = limitType === 'up' ? limitUp : limitDown

  return (
    <main className="min-h-screen p-6 pb-24">
      <div className="max-w-[1400px] mx-auto space-y-4 animate-fade-up">
        {/* Top Stats */}
        <div className="grid grid-cols-[200px_148px_1fr_1fr] gap-4">
          <EmotionGauge value={68} label="谨慎偏多" />

          <Card className="w-[148px]">
            <CardHeader title="涨跌停" />
            <CardBody className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-3 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-rise" /> 涨停
                </span>
                <span className="text-lg font-bold font-mono text-rise">{limitUp.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-3 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3 text-fall" /> 跌停
                </span>
                <span className="text-lg font-bold font-mono text-fall">{limitDown.total}</span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="周期分布" icon={<BarChart3 className="w-3 h-3" />} />
            <CardBody>
              <div className="space-y-2">
                {[['今日', `${limitUp.total}家`], ['近3日', '--'], ['近7日', '--']].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-[11px]">
                    <span className="text-text-3">{label}</span>
                    <span className="font-mono text-text-1">{value}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="资金风格" />
            <CardBody>
              <div className="space-y-2">
                {[
                  { name: '大盘股', pct: 42, color: 'bg-brand-blue' },
                  { name: '中盘股', pct: 35, color: 'bg-brand-orange' },
                  { name: '小盘股', pct: 23, color: 'bg-brand-purple' },
                ].map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-text-3">{s.name}</span>
                      <span className="font-mono text-text-1">{s.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-bg-2 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color} transition-all duration-500`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Limit Pool + Analysis */}
        <div className="grid grid-cols-[1fr_300px] gap-4">
          <div>
            <div className="mb-3">
              <Tabs
                tabs={[{ key: 'up', label: '涨停池' }, { key: 'down', label: '跌停池' }]}
                active={limitType}
                onChange={(key) => setLimitType(key as 'up' | 'down')}
              />
            </div>
            <LimitPoolTable stocks={current.data} type={limitType} />
          </div>

          <Card>
            <CardHeader title="情绪分析" />
            <CardBody>
              <div className="space-y-3 text-xs text-text-2 leading-relaxed">
                <p><span className="font-semibold text-text-1">市场阶段：</span>复苏期，量能温和扩张，指数方向向上。</p>
                <p><span className="font-semibold text-text-1">今日情绪：</span>涨停{limitUp.total}家，跌停{limitDown.total}家。</p>
                <p><span className="font-semibold text-text-1">主线方向：</span>AI算力、低空经济为主线，科技成长占优。</p>
                <p><span className="font-semibold text-text-1">操作建议：</span>可维持5-6成仓位，关注2板以上连板股的回调买点。</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}
