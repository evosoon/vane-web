# Vane · 风向标

现代化的 A 股市场数据分析平台，提供实时行情、情绪分析、AI 问股等功能。

## 技术栈

- **框架**: Next.js 16 (App Router) + TypeScript 5
- **样式**: Tailwind CSS 4 + CSS 变量设计系统
- **状态管理**: Zustand v5
- **图表**: lightweight-charts v5 (K线图) + recharts (统计图表)
- **UI 组件**: Radix UI + 自定义组件库
- **字体**: DM Sans + JetBrains Mono + Noto Sans SC
- **主题**: next-themes (亮色/暗色模式)

## 功能特性

### 1. 个股行情
- 实时行情数据展示
- 高性能 Canvas K 线图（lightweight-charts）
- 支持日K/周K/月K 切换
- 前复权/后复权/不复权
- MA5/MA10/MA20 均线指标
- 成交量柱状图
- 综合评估（技术面/资金面/基本面）
- AI 摘要分析

### 2. 市场情绪
- 情绪指数表盘（0-100）
- 涨跌停统计
- 涨停池/跌停池实时数据
- 连板股追踪
- 资金风格分布（大盘/中盘/小盘）
- 情绪分析报告

### 3. AI 问股
- 对话式 AI 助手（Mock 数据）
- 支持多轮对话
- 对话历史管理
- 快捷问题模板
- 打字机效果流式输出
- 本地存储对话记录

### 4. 设置
- 亮色/暗色主题切换
- 数据源配置
- 快捷键说明
- 关于信息

## 项目结构

```
vane/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx           # 首页（个股）
│   │   ├── emotion/           # 情绪页
│   │   ├── chat/              # 问股页
│   │   └── settings/          # 设置页
│   ├── components/
│   │   ├── layout/            # 布局组件
│   │   │   ├── Sidebar.tsx    # 68px 窄侧边栏
│   │   │   ├── AppHeader.tsx  # 顶部栏
│   │   │   └── NavItem.tsx    # 导航项
│   │   ├── finance/           # 金融业务组件
│   │   │   ├── KLineChart.tsx # K线图
│   │   │   ├── QuoteCard.tsx  # 行情卡片
│   │   │   ├── EmotionGauge.tsx # 情绪表盘
│   │   │   ├── LimitPoolTable.tsx # 涨跌停池
│   │   │   └── NewsItem.tsx   # 新闻条目
│   │   └── ui/                # 基础 UI 组件
│   │       ├── Card.tsx
│   │       ├── Button.tsx
│   │       ├── Tabs.tsx
│   │       └── ChangeBadge.tsx
│   ├── stores/                # Zustand 状态管理
│   │   ├── market.ts          # 市场数据
│   │   ├── chart.ts           # 图表配置
│   │   ├── watchlist.ts       # 自选股
│   │   └── chat.ts            # 对话历史
│   ├── lib/
│   │   ├── finance-api.ts     # API 调用
│   │   ├── ai-mock.ts         # AI Mock 数据
│   │   └── utils.ts           # 工具函数
│   └── hooks/
│       └── use-market-status.ts # 市场状态 Hook
├── public/
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
npm run start
```

## 与后端集成

项目设计为与现有 `vane-data` 后端完全兼容：

1. **后端 API** (端口 8000)
   ```bash
   cd /path/to/vane-data/vane-data-api
   ./venv/bin/python main.py
   ```

2. **WebSocket 服务** (端口 3003)
   ```bash
   cd /path/to/vane-data/vane-data-web/ws-finance
   bun run dev
   ```

3. **前端** (端口 3000)
   ```bash
   cd /path/to/vane
   npm run dev
   ```

配置 API 代理（在 `next.config.ts` 中）：

```typescript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8000/api/:path*',
    },
  ]
}
```

## 设计系统

### 颜色变量

```css
/* Light theme */
--bg0: #F0F2F5;  /* 页面背景 */
--bg1: #FFFFFF;  /* 卡片背景 */
--bg2: #F5F6F8;  /* 次级背景 */
--t1: #141921;   /* 主文本 */
--t2: #3D4554;   /* 次级文本 */
--t3: #7B8496;   /* 辅助文本 */

/* Market colors (A股红涨绿跌) */
--rise: #E5334B;  /* 上涨 */
--fall: #0DB070;  /* 下跌 */
```

### 字体

- **无衬线**: DM Sans + Noto Sans SC
- **等宽**: JetBrains Mono（用于数字、代码）

### 圆角

- `--rs: 8px` (小)
- `--rm: 12px` (中)
- `--rl: 16px` (大)

### 阴影

- `--ss`: 小阴影（卡片）
- `--sm`: 中阴影（悬浮）
- `--sl`: 大阴影（模态框）

## 后续扩展

- [ ] 接入真实 AI API（DeepSeek/GPT）
- [ ] 接入真实情绪分析算法
- [ ] WebSocket 实时行情推送
- [ ] 更多技术指标（BOLL/KDJ/RSI）
- [ ] 自选股云同步
- [ ] 消息推送（涨跌停提醒）
- [ ] 数据导出（CSV/Excel）
- [ ] 多语言支持（英文）

## 开发规范

- 使用 TypeScript 严格模式
- 组件采用函数式 + Hooks
- 状态管理优先使用 Zustand
- 样式使用 Tailwind CSS + CSS 变量
- 遵循 Next.js App Router 最佳实践

## License

MIT
