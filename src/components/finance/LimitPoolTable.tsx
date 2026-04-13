'use client'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { ChangeBadge } from '@/components/ui/ChangeBadge'
import { cn } from '@/lib/utils'
import type { LimitStockDisplay } from '@/hooks/use-limit-pool'

interface LimitPoolTableProps {
  stocks: LimitStockDisplay[]
  type: 'up' | 'down'
}

export function LimitPoolTable({ stocks, type }: LimitPoolTableProps) {
  const title = type === 'up' ? '涨停池' : '跌停池'

  return (
    <Card>
      <CardHeader title={title} subtitle={`${stocks.length}只`} />
      <CardBody noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead className="bg-bg-2 sticky top-0 z-10">
              <tr className="text-text-3 font-medium">
                <th className="text-left px-3 py-2 font-semibold">代码</th>
                <th className="text-left px-3 py-2 font-semibold">名称</th>
                <th className="text-right px-3 py-2 font-semibold">价格</th>
                <th className="text-right px-3 py-2 font-semibold">涨跌幅</th>
                <th className="text-right px-3 py-2 font-semibold">成交额</th>
                <th className="text-right px-3 py-2 font-semibold">换手率</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className={cn(
                    'border-t border-border-1 transition-colors duration-150',
                    'hover:bg-bg-2 cursor-pointer'
                  )}
                >
                  <td className="px-3 py-2 font-mono text-text-2">{stock.symbol}</td>
                  <td className="px-3 py-2 text-text-1 font-medium">{stock.name}</td>
                  <td className="px-3 py-2 text-right font-mono text-text-1">
                    {stock.price.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <ChangeBadge value={stock.changePercent} />
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-text-2">
                    {stock.amountDisplay}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-text-2">
                    {stock.turnoverRate.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  )
}
