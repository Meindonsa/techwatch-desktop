import Dexie, { type Table } from 'dexie'
import type { FetchStatus, SourceStatus, SourceType } from './DbType'

export interface Source {
  id?: number
  name: string
  url: string
  feed_url: string
  type: SourceType
  status: SourceStatus
  created_at: number
  last_fetched_at: number | null
}

export interface Article {
  id?: number
  url: string
  source_id: number
  title: string
  summary: string | null
  content: string | null
  author: string | null
  thumbnail_url: string | null
  published_at: number
  saved_at: number
}

export interface FetchLog {
  id?: number
  source_id: number
  status: FetchStatus
  articles_found: number
  error_message: string | null
  fetched_at: number
}

export interface Setting {
  key: string
  value: string
}

export interface Settings {
  cron_interval_min: string
  notify_email: string
  notify_push: string
  [key: string]: string
}

// ─── Database ──────────────────────────────────────────────────────────────────

class FeedReaderDatabase extends Dexie {
  sources!:    Table<Source,    number>
  articles!:   Table<Article,   number>
  fetch_logs!: Table<FetchLog,  number>
  settings!:   Table<Setting,   string>

  constructor() {
    super('Techwatch')

    this.version(1).stores({
      sources:    '++id, name, url, type, status, created_at, last_fetched_at',
      articles:   '++id, &url, source_id, published_at, saved_at',
      fetch_logs: '++id, source_id, status, fetched_at',
      settings:   'key',
    })

    this.on('populate', async () => {
      await this.settings.bulkAdd([
        { key: 'cron_interval_min', value: '60'    },
        { key: 'notify_email',      value: 'false' },
        { key: 'notify_push',       value: 'false' },
      ])
    })
  }
}

export const db = new FeedReaderDatabase()