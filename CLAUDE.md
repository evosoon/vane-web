@AGENTS.md

# Vane (风向标) — Claude Development Guide

> A股市场数据分析平台，提供行情、K线、资讯、情绪面分析和 AI 辅助决策。

**Purpose**: A股数据分析平台
**Priority**: 核心页面开发，后端 API 对接
*Last reviewed: 2026-04-13*

## Tech Stack

```
Next.js 16.2.3      — App Router, Turbopack dev
React 19.2.4        — UI
TypeScript 5        — strict mode
Tailwind CSS 4      — utility styling + CSS variable design tokens
TanStack Query 5    — client-side server state
Zustand 5           — client state management
Radix UI            — dialog, scroll-area, separator, tabs, tooltip
Recharts 3          — declarative charts
lightweight-charts 5 — K-line / candlestick charts
socket.io-client 4  — real-time market data
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
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout (fonts, ThemeProvider)
│   ├── page.tsx            # Home — quote, K-line chart, news, AI summary
│   ├── emotion/page.tsx    # Market emotion gauge
│   ├── chat/page.tsx       # AI chat
│   └── settings/page.tsx   # Settings
├── components/
│   ├── ui/                 # Primitives: Card, Tabs, Button, ChangeBadge
│   ├── finance/            # Domain: QuoteCard, KLineChart, LimitPoolTable, EmotionGauge, NewsItem
│   ├── layout/             # Shell: Sidebar, AppHeader, NavItem
│   └── theme-provider.tsx
├── hooks/                  # Custom hooks (use-market-status)
├── lib/
│   ├── finance-api.ts      # API client (fetch-based, base URL from NEXT_PUBLIC_API_URL)
│   ├── ai-mock.ts          # AI response mocks
│   └── utils.ts            # cn() helper
└── stores/                 # Zustand stores
    ├── market.ts           # Current symbol, quotes, WebSocket status
    ├── chart.ts            # Chart period/adjust state
    ├── watchlist.ts        # User watchlist
    └── chat.ts             # Chat messages
```

## Design System

- CSS variables defined in `globals.css` — light/dark themes via `.dark` class
- A股 convention: **红涨 (`--rise: #E5334B`)，绿跌 (`--fall: #0DB070`)**
- Custom color tokens: `bg-0/1/2/3`, `text-1/2/3/4`, `border-1/2`, `rise/fall`, `brand-*`
- Tailwind config extends these tokens — use semantic classes (`text-rise`, `bg-bg-1`)
- Font stack: DM Sans (Latin) + Noto Sans SC (中文) + JetBrains Mono (code)

## Data Fetching

| Scenario | Approach |
|----------|----------|
| Static/SSR data | Server Components (default) |
| Client interactive data | TanStack Query → `lib/finance-api.ts` |
| Real-time quotes | socket.io-client → Zustand store |
| Client UI state | Zustand |

- Backend API: `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`)
- API response format: `{ code: number, msg: string, data: T }`
- Current pages use mock data — migration to real API is a priority

## Rules

- No `'use client'` unless the component genuinely needs browser APIs or hooks.
- Shared components → `components/ui/` or `components/finance/`. Route-specific → `app/<route>/`.
- Use `cn()` from `lib/utils.ts` for conditional Tailwind class merging.
- Zustand stores are flat — one store per domain, no nested stores.
- Market colors: always use `rise`/`fall` tokens, never hardcode red/green.
- API types defined in `lib/finance-api.ts` — keep response types colocated with API functions.

## Do NOT

- Hardcode market color values — use CSS variable tokens
- Add dependencies without checking bundle impact (this is a data-heavy SPA)
- Use default Next.js `fetch` caching for real-time market data
- Put finance-specific logic in UI components — extract to hooks or stores
