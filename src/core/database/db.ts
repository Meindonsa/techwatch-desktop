import Dexie, { type Table } from 'dexie'
import type { SourceType } from './DbType'

export interface Feed {
  id?: number
  name: string
  original_url: string
  feed_url: string
  type: SourceType
  created_at: number
}

export interface Article {
  id?: number
  title: string
  link: string
  pub_date: string
  summary: string | null
  author: string | null
  image: string | null
  feed_id: number
  fetched_at: string | null
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
  feeds!: Table<Feed, number>
  articles!: Table<Article, number>
  settings!: Table<Setting, string>

  constructor() {
    super('Techwatch')

    this.version(1).stores({
      feeds: 'id, name, original_url, &feed_url, type, created_at',
      articles: 'id, title,  &link, pub_date, summary, author, image, feed_id, fetched_at',
      settings: 'key',
    })
  }
}

export const db = new FeedReaderDatabase()
