export type SourceType = 'rss' | 'atom' | 'html'
export type SourceStatus = 'active' | 'paused'
export type FetchStatus = 'success' | 'error'

export interface GetArticlesOptions {
  sourceId?: number
  limit?: number
  offset?: number
}
