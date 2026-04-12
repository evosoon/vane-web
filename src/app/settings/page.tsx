'use client'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useTheme } from 'next-themes'
import { Sun, Moon, Database, Keyboard, Info } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <main className="min-h-screen p-6 pb-24">
      <div className="max-w-[800px] mx-auto space-y-4 animate-fade-up">
        <Card>
          <CardHeader title="外观" icon={<Sun className="w-3 h-3" />} />
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-text-1 mb-0.5">主题模式</div>
                <div className="text-[10px] text-text-3">选择亮色或暗色主题</div>
              </div>
              {mounted && (
                <div className="flex gap-2">
                  <Button variant={theme === 'light' ? 'primary' : 'outline'} onClick={() => setTheme('light')} className="px-3 py-1.5">
                    <Sun className="w-3 h-3" /> 亮色
                  </Button>
                  <Button variant={theme === 'dark' ? 'primary' : 'outline'} onClick={() => setTheme('dark')} className="px-3 py-1.5">
                    <Moon className="w-3 h-3" /> 暗色
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="数据源" icon={<Database className="w-3 h-3" />} />
          <CardBody>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-text-1 mb-0.5">行情数据源</div>
                  <div className="text-[10px] text-text-3">当前使用：腾讯财经</div>
                </div>
                <Button variant="outline" className="px-3 py-1.5">切换数据源</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="快捷键" icon={<Keyboard className="w-3 h-3" />} />
          <CardBody>
            <div className="space-y-2 text-xs">
              {[['搜索股票', '⌘K'], ['切换主题', '⌘T'], ['刷新数据', '⌘R']].map(([label, key]) => (
                <div key={label} className="flex items-center justify-between py-1">
                  <span className="text-text-2">{label}</span>
                  <kbd className="px-2 py-0.5 bg-bg-2 border border-border-1 rounded text-[10px] font-mono text-text-3">{key}</kbd>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="关于" icon={<Info className="w-3 h-3" />} />
          <CardBody>
            <div className="space-y-2 text-xs text-text-2">
              {[['版本', 'v2.0.0'], ['技术栈', 'Next.js 16 + TypeScript'], ['数据更新', '实时（交易时段）']].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span>{label}</span><span className="text-text-1">{value}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
