// Mock data used as fallback when backend API is unavailable.
// Shapes match what components expect (camelCase props).

export const mockQuote = {
  symbol: 'sh600519',
  name: '贵州茅台',
  price: 1678.5,
  change: 23.8,
  changePercent: 1.44,
  open: 1655.0,
  high: 1682.0,
  low: 1650.0,
  volume: 1234567,
  amount: 2056789000,
  turnoverRate: 0.98,
  peRatio: 32.5,
}

export const mockKlineData = Array.from({ length: 60 }, (_, i) => {
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

export const mockNews = [
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

export const mockLimitUpStocks = [
  { symbol: 'sz300750', name: '宁德时代', price: 185.5, changePercent: 10.0, amount: 3456789000, turnoverRate: 5.23 },
  { symbol: 'sh688981', name: '中芯国际', price: 52.3, changePercent: 20.0, amount: 1234567000, turnoverRate: 3.81 },
  { symbol: 'sz002594', name: '比亚迪', price: 268.9, changePercent: 10.0, amount: 2345678000, turnoverRate: 4.12 },
]

export const mockLimitDownStocks = [
  { symbol: 'sz000001', name: '平安银行', price: 12.34, changePercent: -10.0, amount: 987654000, turnoverRate: 2.15 },
]
