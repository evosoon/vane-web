@AGENTS.md

# Vane (风向标) — Claude Development Guide

> A股市场数据分析平台，提供行情、K线、资讯、情绪面分析和 AI 辅助决策。

**Purpose**: A股数据分析平台
**Priority**: 核心页面开发，后端 API 对接
*Last reviewed: 2026-04-14*

## Tech Stack

```
Next.js 16.2.3      — App Router, Turbopack dev
React 19.2.4        — UI
TypeScript 5        — strict mode
Tailwind CSS 4      — utility styling + CSS variable design tokens
TanStack Query 5    — client-side server state (with mock fallback)
Zustand 5           — client state management
Radix UI            — dialog, scroll-area, separator, tabs, tooltip
Recharts 3          — declarative charts
lightweight-charts 5 — K-line / candlestick charts
socket.io-client 4  — real-time market data (installed, not yet wired)
next-themes         — dark mode
lucide-react        — icons
sonner              — toast notifications
date-fns 4          — date formatting
```

## Commands

```bash
npm run dev       # Dev server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

## Directory Structure

```
src/
├── app/                        # App Router pages
│   ├── layout.tsx              # Root layout (fonts, ThemeProvider, QueryProvider)
│   ├── page.tsx                # Home — quote, K-line chart, news, AI summary
│   ├── emotion/page.tsx        # Market emotion gauge
│   ├── chat/page.tsx           # AI chat (mock only)
│   └── settings/page.tsx       # Settings
├── components/
│   ├── ui/                     # Primitives: Card, Tabs, Button, ChangeBadge, DataSourceBadge
│   ├── finance/                # Domain: QuoteCard, KLineChart, LimitPoolTable, EmotionGauge, NewsItem
│   ├── layout/
│   │   └── Dock.tsx            # Bottom navigation (nav, search, refresh, market status)
│   ├── query-provider.tsx      # TanStack Query provider
│   └── theme-provider.tsx
├── hooks/                      # Data hooks with mock fallback
│   ├── use-quote.ts            # Quote → QuoteCard (snake→camel transform)
│   ├── use-kline.ts            # K-line bars
│   ├── use-news.ts             # News (digest→summary mapping)
│   ├── use-limit-pool.ts       # Limit pool (涨停/跌停)
│   ├── use-api-health.ts       # Backend health polling (30s)
│   └── use-market-status.ts    # Trading session detection
├── lib/
│   ├── finance-api.ts          # API client — all backend endpoints with types
│   ├── mock-data.ts            # Mock fallback data for all hooks
│   ├── query-client.ts         # TanStack Query client config
│   ├── ai-mock.ts              # AI streaming mock (chat page only)
│   └── utils.ts                # cn(), formatAmount(), formatMarketCap()
└── stores/                     # Zustand stores
    ├── market.ts               # Current symbol, quotes, WebSocket status
    ├── chart.ts                # Chart period/adjust state
    ├── watchlist.ts            # User watchlist (localStorage persisted)
    └── chat.ts                 # Chat sessions (localStorage persisted)
```

## Design System

- CSS variables defined in `globals.css` — light/dark themes via `.dark` class
- A股 convention: **红涨 (`--rise: #E5334B`)，绿跌 (`--fall: #0DB070`)**
- Custom color tokens: `bg-0/1/2/3`, `text-1/2/3/4`, `border-1/2`, `rise/fall`, `brand-*`
- Tailwind config extends these tokens — use semantic classes (`text-rise`, `bg-bg-1`)
- Font stack: DM Sans (Latin) + Noto Sans SC (中文) + JetBrains Mono (code)
- Exception: lightweight-charts and SVG require resolved hex values — use shared constants if adding more

## Data Fetching

| Scenario | Approach |
|----------|----------|
| Client interactive data | TanStack Query hooks (`useQuote`, `useKline`, etc.) with mock fallback |
| Real-time quotes | socket.io-client → Zustand store (not yet implemented) |
| Client UI state | Zustand |
| AI chat | `ai-mock.ts` streaming simulation (awaiting LLM backend) |

- Backend API: `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`)
- API response format: `{ code: number, msg: string, data: T }`
- Backend health: `useApiHealth` polls `/api/health` every 30s — drives Dock border color (yellow = mock)
- Each hook independently falls back to mock data on API failure
- snake_case from backend is transformed to camelCase in hooks at the boundary

## Layout

- **Dock** (bottom floating bar): navigation, ⌘K search, ⌘R refresh, market status, settings
- Dock search accepts stock codes (e.g. `600519` → `sh600519`), updates `useMarketStore.symbol`
- Home page reads symbol from store — search switches the viewed stock

## Rules

- No `'use client'` unless the component genuinely needs browser APIs or hooks.
- Shared components → `components/ui/` or `components/finance/`. Route-specific → `app/<route>/`.
- Use `cn()` from `lib/utils.ts` for conditional Tailwind class merging.
- Zustand stores are flat — one store per domain, no nested stores.
- Market colors: use `rise`/`fall` tokens in Tailwind. Canvas/SVG APIs that need hex values are the exception.
- API types defined in `lib/finance-api.ts` — keep response types colocated with API functions.
- Data hooks handle snake→camel transform — components always receive camelCase props.

## Do NOT

- Add dependencies without checking bundle impact (this is a data-heavy SPA)
- Use default Next.js `fetch` caching for real-time market data
- Put finance-specific logic in UI components — extract to hooks or stores
- Duplicate mock data inline in pages — centralize in `lib/mock-data.ts`
