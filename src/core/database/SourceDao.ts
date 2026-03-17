import { db, type Source } from '@/core/database/db.ts'

export const SourcesDao = {
  getAll(): Promise<Source[]> {
    return db.sources.toArray()
  },

  getById(id: number): Promise<Source | undefined> {
    return db.sources.get(id)
  },

  add(source: Omit<Source, 'id' | 'created_at' | 'last_fetched_at'>): Promise<number> {
    return db.sources.add({
      ...source,
      type: "rss",
      feed_url: "url",
      status: source.status ?? 'active',
      created_at: Date.now(),
      last_fetched_at: null,
    })
  },

  update(id: number, changes: Partial<Omit<Source, 'id'>>): Promise<number> {
    return db.sources.update(id, changes)
  },

  remove(id: number): Promise<void> {
    return db.transaction('rw', db.sources, db.articles, db.fetch_logs, async () => {
      await db.articles.where('source_id').equals(id).delete()
      await db.fetch_logs.where('source_id').equals(id).delete()
      await db.sources.delete(id)
    })
  },

  markFetched(id: number): Promise<number> {
    return db.sources.update(id, { last_fetched_at: Date.now() })
  },
}
