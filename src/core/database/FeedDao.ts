import { db, type Feed } from '@/core/database/db.ts'

export const FeedDao = {
  getAll(): Promise<Feed[]> {
    return db.feeds.toArray()
  },

  getById(id: number): Promise<Feed | undefined> {
    return db.feeds.get(id)
  },

  getByFeedUrl(value: any): Promise<Feed | undefined> {
    return db.feeds.get({ feed_url: value })
  },

  async addIfNotExists(feeds: Feed) {
    try {
      return await db.feeds.add(feeds)
    } catch (e) {
      if ((e as Error).name === 'ConstraintError') return null
      throw e
    }
  },

  async bulkAddIfNotExists(feeds: Feed[]): Promise<number> {
    if (feeds.length == 0) return 0
    let inserted = 0
    for (const feed of feeds) {
      const url = await this.addIfNotExists(feed)
      if (url !== null) inserted++
    }
    return inserted
  },

  add(source: Feed): Promise<number> {
    return db.feeds.add({
      ...source,
    })
  },

  remove(id: number): Promise<void> {
    return db.transaction('rw', db.feeds, db.articles, async () => {
      await db.articles.where('feed_id').equals(id).delete()
      await db.feeds.delete(id)
    })
  },
}
