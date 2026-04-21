export type SourceType = 'rss' | 'atom' | 'html'
export type SourceStatus = 'active' | 'paused'
export type FetchStatus = 'success' | 'error'

export interface GetArticlesOptions {
  sourceId?: number
  limit?: number
  offset?: number
}

export interface User {
  id: number
  username: string
}

export interface Register {
  password: string
  username: string
}

export interface LoginResponse {
  token: string
  user: User
}
