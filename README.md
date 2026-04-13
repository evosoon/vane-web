# Vane · 风向标

A 股市场数据分析平台，提供实时行情、K 线图表、市场情绪、AI 问股等功能。

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) + TypeScript 5 |
| 样式 | Tailwind CSS 4 + CSS 变量设计系统 |
| 数据请求 | TanStack Query 5（自动 mock 回退） |
| 状态管理 | Zustand 5 |
| K 线图 | lightweight-charts 5 |
| UI 组件 | Radix UI + 自定义组件库 |
| 主题 | next-themes（亮色 / 暗色） |

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```bash
# 后端 API 地址（vane-data-api 服务）
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> 如果不配置，默认连接 `http://localhost:8000`。后端不可用时自动回退到 mock 数据，Dock 导航栏边框变为黄色提示。

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 生产构建

```bash
npm run build
npm run start
```

## 与后端集成

本项目前端设计为与 [vane-data](../vane-data) 后端配合使用。

### 启动后端

```bash
# API 服务（端口 8000）
cd ../vane-data && bun run dev

# 或单独启动 API
cd ../vane-data/vane-data-api
python main.py
```

### 后端 API 端点

| 端点 | 说明 |
|------|------|
| `GET /api/health` | 健康检查 |
| `GET /api/quote?symbols=sh600519` | 实时行情 |
| `GET /api/kline?symbol=sh600519&period=day&adjust=qfq` | K 线数据 |
| `GET /api/limit-pool?type=limit_up` | 涨停 / 跌停池 |
| `GET /api/news` | 财经快讯 |
| `GET /api/sectors` | 板块排行 |
| `GET /api/stock-detail?symbol=sh600519` | 个股详情 |
| `GET /api/capital-flow?symbol=sh600519` | 资金流向 |

### 数据回退机制

前端通过 `/api/health` 端点检测后端状态：

- **后端可用** → 使用真实数据，导航栏正常边框
- **后端不可用** → 自动切换到内置 mock 数据，导航栏边框变为黄色

每个数据 hook（`useQuote`、`useKline`、`useNews`、`useLimitPool`）独立判断，API 请求失败时回退到对应的 mock 数据。

## 配置说明

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | 后端 API 基础地址 |

### 部署到其他环境

```bash
# 连接远程后端
NEXT_PUBLIC_API_URL=https://api.example.com npm run build

# 或在 .env.production 中配置
echo "NEXT_PUBLIC_API_URL=https://api.example.com" > .env.production
npm run build
```

## 项目结构

```
src/
├── app/                        # 页面
│   ├── page.tsx                # 首页（个股行情）
│   ├── emotion/page.tsx        # 市场情绪
│   ├── chat/page.tsx           # AI 问股
│   └── settings/page.tsx       # 设置
├── components/
│   ├── layout/                 # 布局：Dock 底部导航、Sidebar、AppHeader
│   ├── finance/                # 业务：KLineChart、QuoteCard、LimitPoolTable 等
│   └── ui/                     # 基础：Card、Button、Tabs、ChangeBadge
├── hooks/                      # 数据 hooks（含 mock 回退）
│   ├── use-quote.ts            # 行情数据
│   ├── use-kline.ts            # K 线数据
│   ├── use-news.ts             # 快讯数据
│   ├── use-limit-pool.ts       # 涨跌停池
│   └── use-api-health.ts       # 后端健康检测
├── stores/                     # Zustand 状态
│   ├── market.ts               # 当前 symbol、行情
│   ├── chart.ts                # 图表配置
│   ├── watchlist.ts            # 自选股（localStorage 持久化）
│   └── chat.ts                 # 对话历史（localStorage 持久化）
├── lib/
│   ├── finance-api.ts          # API 客户端（全部后端端点）
│   ├── mock-data.ts            # Mock 回退数据
│   ├── query-client.ts         # TanStack Query 配置
│   └── utils.ts                # cn()、formatAmount()
└── hooks/
    └── use-market-status.ts    # 交易时段判断
```

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `⌘K` | 打开搜索（输入股票代码回车跳转） |
| `⌘.` | 切换亮色 / 暗色主题 |
| `⌘R` | 刷新数据 |
| `Esc` | 关闭搜索框 |

## 设计系统

### 市场颜色（A 股惯例）

```
红涨: --rise: #E5334B
绿跌: --fall: #0DB070
```

### 主题

通过 CSS 变量实现亮色 / 暗色切换，定义在 `src/app/globals.css`。

## License

MIT
