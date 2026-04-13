const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: controller.signal,
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
  } finally {
    clearTimeout(timeout)
  }
}

// ─── Health ───

export interface HealthResponse {
  status: string
}

export async function fetchHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>('/api/health')
}

// ─── Quote ───

export interface QuoteItem {
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
}

export interface QuoteResponse {
  source: string
  count: number
  quotes: QuoteItem[]
}

export async function fetchQuote(symbols: string, source = 'tencent'): Promise<QuoteResponse> {
  return apiFetch<QuoteResponse>(`/api/quote?symbols=${symbols}&source=${source}`)
}

// ─── Kline ───

export interface KlineBar {
  date: string
  open: number
  close: number
  high: number
  low: number
  volume: number
  amount?: number
}

export interface KlineResponse {
  symbol: string
  name: string
  period: string
  adjust: string
  count: number
  bars: KlineBar[]
}

export async function fetchKline(
  symbol: string,
  period = 'day',
  adjust = 'qfq',
  limit = 120
): Promise<KlineResponse> {
  return apiFetch<KlineResponse>(
    `/api/kline?symbol=${symbol}&period=${period}&adjust=${adjust}&count=${limit}`
  )
}

// ─── Limit Pool ───

export interface LimitStock {
  symbol: string
  name: string
  price: number
  change_percent: number
  amount: number
  turnover_rate: number
}

export interface LimitPoolResponse {
  type: string
  date: string
  page: number
  page_size: number
  total: number
  pages: number
  source: string
  stocks: LimitStock[]
}

export async function fetchLimitPool(
  type: 'up' | 'down' = 'up',
  page = 1,
  pageSize = 20
): Promise<LimitPoolResponse> {
  const apiType = type === 'up' ? 'limit_up' : 'limit_down'
  return apiFetch<LimitPoolResponse>(
    `/api/limit-pool?type=${apiType}&page=${page}&page_size=${pageSize}`
  )
}

// ─── News ───

export interface NewsItem {
  id: string
  title: string
  digest: string
  image: string
  source: string
  time: string
  url: string
}

export interface NewsResponse {
  page: number
  page_size: number
  page_count: number
  news: NewsItem[]
}

export async function fetchNews(page = 1, pageSize = 15): Promise<NewsResponse> {
  return apiFetch<NewsResponse>(`/api/news?page=${page}&page_size=${pageSize}`)
}

// ─── Sectors ───

export interface Sector {
  code: string
  name: string
  change_percent: number
  limit_up_count: number
  stock_count: number
  lead_stock_name: string
  lead_stock_code: string
  lead_stock_change: number
  market_cap: number
}

export interface SectorsResponse {
  type: string
  page: number
  page_size: number
  total: number
  pages: number
  source: string
  sectors: Sector[]
}

export async function fetchSectors(
  type = 'industry',
  page = 1,
  pageSize = 20
): Promise<SectorsResponse> {
  return apiFetch<SectorsResponse>(
    `/api/sectors?type=${type}&page=${page}&page_size=${pageSize}`
  )
}

// ─── Sector Stocks ───

export interface SectorStock {
  symbol: string
  code: string
  name: string
  price: number
  change_percent: number
}

export interface SectorStocksResponse {
  sector_code: string
  page: number
  page_size: number
  total: number
  pages: number
  stocks: SectorStock[]
}

export async function fetchSectorStocks(
  code: string,
  page = 1,
  pageSize = 20
): Promise<SectorStocksResponse> {
  return apiFetch<SectorStocksResponse>(
    `/api/sector-stocks?code=${code}&page=${page}&page_size=${pageSize}`
  )
}

// ─── Stock Detail ───

export interface StockDetail {
  symbol: string
  code: string
  name: string
  price: number
  change_percent: number
  change_amount: number
  open: number
  high: number
  low: number
  pre_close: number
  volume: number
  volume_display: string
  amount: number
  amount_display: string
  amplitude: number
  turnover_rate: number
  pe_ttm: number
  pb: number
  volume_ratio: number
  high_52w: number
  low_52w: number
  change_52w: number
  total_market_cap: number
  total_market_cap_display: string
  float_market_cap: number
  float_market_cap_display: string
  rating: number
  is_up: boolean
  market: string
  timestamp: string
}

export async function fetchStockDetail(symbol: string): Promise<StockDetail> {
  return apiFetch<StockDetail>(`/api/stock-detail?symbol=${symbol}`)
}

// ─── Capital Flow ───

export interface CapitalFlowDay {
  date: string
  main_net: number
  super_large_net: number
  large_net: number
  mid_net: number
  small_net: number
  retail_small_net: number
  retail_mid_net: number
  retail_large_net: number
}

export interface CapitalFlowResponse {
  symbol: string
  name: string
  total_main_net: number
  days: number
  flows: CapitalFlowDay[]
}

export async function fetchCapitalFlow(symbol: string, days = 10): Promise<CapitalFlowResponse> {
  return apiFetch<CapitalFlowResponse>(`/api/capital-flow?symbol=${symbol}&days=${days}`)
}
