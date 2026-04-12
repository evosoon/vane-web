const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`)
  }

  const json: ApiResponse<T> = await res.json()

  if (json.code !== 200) {
    throw new Error(json.msg || 'Unknown error')
  }

  return json.data
}

// Types
export interface QuoteResponse {
  source: string
  count: number
  quotes: Array<{
    symbol: string
    name: string
    price: number
    change_percent: number
    change_amount: number
    open: number
    high: number
    low: number
    pre_close: number
    volume: number
    amount: number
    amount_display: string
    turnover_rate: number
    pe_ratio: number
    pb_ratio: number
    market_cap: number
    market_cap_display: string
    market: string
    timestamp: string
  }>
}

export interface KlineBar {
  date: string
  open: number
  close: number
  high: number
  low: number
  volume: number
}

export interface KlineResponse {
  symbol: string
  period: string
  adjust: string
  count: number
  klines: KlineBar[]
}

export interface LimitPoolResponse {
  type: string
  count: number
  total: number
  page: number
  page_size: number
  stocks: Array<{
    symbol: string
    name: string
    price: number
    change_percent: number
    limit_times: number
    first_limit_time: string
    last_limit_time: string
    turnover: number
    reason: string
  }>
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  time: string
  url: string
  tags: string[]
}

export interface NewsResponse {
  count: number
  news: NewsItem[]
}

// API Functions
export async function fetchQuote(symbols: string, source = 'tencent'): Promise<QuoteResponse> {
  return apiFetch<QuoteResponse>(`/api/quote?symbols=${symbols}&source=${source}`)
}

export async function fetchKline(
  symbol: string,
  period = 'day',
  adjust = 'qfq',
  limit = 120
): Promise<KlineResponse> {
  return apiFetch<KlineResponse>(
    `/api/kline?symbol=${symbol}&period=${period}&adjust=${adjust}&limit=${limit}`
  )
}

export async function fetchLimitPool(
  type = 'up',
  page = 1,
  pageSize = 10
): Promise<LimitPoolResponse> {
  return apiFetch<LimitPoolResponse>(
    `/api/limit-pool?type=${type}&page=${page}&page_size=${pageSize}`
  )
}

export async function fetchNews(page = 1, pageSize = 20): Promise<NewsResponse> {
  return apiFetch<NewsResponse>(`/api/news?page=${page}&page_size=${pageSize}`)
}

export async function fetchSectors(page = 1, pageSize = 20) {
  return apiFetch(`/api/sectors?page=${page}&page_size=${pageSize}`)
}

export async function fetchStockDetail(symbol: string) {
  return apiFetch(`/api/stock-detail?symbol=${symbol}`)
}

export async function fetchCapitalFlow(symbol: string) {
  return apiFetch(`/api/capital-flow?symbol=${symbol}`)
}
