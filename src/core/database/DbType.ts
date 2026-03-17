export type SourceType = 'rss' | 'atom' | 'html'
export type SourceStatus = 'active' | 'paused'
export type FetchStatus = 'success' | 'error'

export interface GetArticlesOptions {
  sourceId?: number
  limit?: number
  offset?: number
}

export interface FetchResult {
  sourceId: number
  articlesFound: number
  inserted: number
  error: string | null
}

export type WorkerInMessage =
  | { type: 'START'; intervalMs: number }
  | { type: 'STOP' }
  | { type: 'UPDATE_INTERVAL'; intervalMs: number }

export type WorkerOutMessage =
  | { type: 'TICK' }
  | { type: 'STARTED'; intervalMs: number }
  | { type: 'STOPPED' }