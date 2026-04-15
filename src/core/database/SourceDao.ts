import { db, type Feed } from '@/core/database/db.ts'

export const SourcesDao = {
  getAll(): Promise<Feed[]> {
    return db.sources.toArray()
  },

  getById(id: number): Promise<Feed | undefined> {
    return db.sources.get(id)
  },

  getByFeedUrl(value: any): Promise<Feed | undefined> {
    return db.sources.get({ feed_url: value })
  },

  add(source: Feed): Promise<number> {
    return db.sources.add({
      ...source,
    })
  },

  remove(id: number): Promise<void> {
    return db.transaction('rw', db.sources, db.articles, async () => {
      await db.articles.where('feed_id').equals(id).delete()
      await db.sources.delete(id)
    })
  },
}
