interface AIMockResponse {
  summary: string
  tags: Array<{ label: string; value: string; color: 'red' | 'green' | 'blue' | 'orange' | 'purple' }>
  body: string
}

const RESPONSES: Record<string, AIMockResponse> = {
  emotion: {
    summary: '情绪指数68，「谨慎偏多」区间，市场温和偏多。',
    tags: [
      { label: '情绪', value: '谨慎偏多', color: 'orange' },
      { label: '涨跌比', value: '3:2', color: 'blue' },
      { label: '涨停', value: '43家', color: 'red' },
    ],
    body: '**市场阶段：** 复苏期，量能温和扩张，指数方向向上。\n\n**今日情绪：** 涨停43家，炸板12家，封板率78%。北向净买入+82亿。\n\n**操作建议：** 可维持5-6成仓位，科技成长为主线。',
  },
  limitup: {
    summary: '今日涨停43家，连板8家，封板率78%，强势标的集中在AI算力和低空经济。',
    tags: [
      { label: '涨停', value: '43家', color: 'red' },
      { label: '连板', value: '8家', color: 'orange' },
      { label: '封板率', value: '78%', color: 'blue' },
    ],
    body: '**强势连板标的：**\n\n- AI算力概念 — 3连板，量比4.2\n- 低空经济标的 — 2连板\n\n**策略参考：** 关注2板以上连板股的回调买点。',
  },
  capital: {
    summary: '主力净流入前三：半导体+42亿、人工智能+31亿、医疗器械+18亿。',
    tags: [
      { label: '流入', value: '半导体', color: 'blue' },
      { label: '净流入', value: '+82亿', color: 'blue' },
    ],
    body: '**主力净流入TOP3：**\n\n- 半导体 +42亿 — 连续3日净流入\n- 人工智能 +31亿 — 情绪驱动\n- 医疗器械 +18亿 — 低位补涨',
  },
  stock: {
    summary: '日K上升通道，当前处于均线多头排列，MACD金叉信号确认。',
    tags: [
      { label: '趋势', value: '上升', color: 'red' },
      { label: '信号', value: 'MACD金叉', color: 'blue' },
    ],
    body: '**技术面：** 均线多头排列，MACD金叉成立。\n\n**量价：** 近3日成交量温和放大，量比1.2。\n\n**综合建议：** 趋势向好，可适当持有。',
  },
}

function matchTopic(query: string): string {
  if (query.includes('情绪') || query.includes('市场')) return 'emotion'
  if (query.includes('涨停') || query.includes('跌停')) return 'limitup'
  if (query.includes('资金') || query.includes('流入') || query.includes('流向')) return 'capital'
  return 'stock'
}

export function getAIMockResponse(query: string): AIMockResponse {
  const topic = matchTopic(query)
  return (
    RESPONSES[topic] || {
      summary: `已分析「${query.slice(0, 20)}」，市场处于震荡修复阶段。`,
      tags: [{ label: '数据', value: '实时', color: 'blue' as const }],
      body: '市场处于震荡修复阶段，科技方向主线明确。如需了解具体板块或个股，可直接输入名称或代码。',
    }
  )
}

export async function simulateAIResponse(
  query: string,
  onChunk: (text: string) => void
): Promise<void> {
  const response = getAIMockResponse(query)
  const fullText = `${response.summary}\n\n${response.body}`
  const chars = fullText.split('')

  for (let i = 0; i < chars.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 15 + Math.random() * 25))
    onChunk(fullText.slice(0, i + 1))
  }
}
