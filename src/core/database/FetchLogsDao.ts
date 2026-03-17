import { db, type FetchLog } from '@/core/database/db.ts'

export const fetchLogsRepo = {
  add(log: Omit<FetchLog, 'id' | 'fetched_at'>): Promise<number> {
    return db.fetch_logs.add({
      ...log,
      fetched_at: Date.now(),
    })
  },

  getBySource(sourceId: number, limit = 20): Promise<FetchLog[]> {
    return db.fetch_logs.where('source_id').equals(sourceId).reverse().limit(limit).toArray()
  },

  purgeOld(daysToKeep = 30): Promise<number> {
    const cutoff = Date.now() - daysToKeep * 24 * 60 * 60 * 1000
    return db.fetch_logs.where('fetched_at').below(cutoff).delete()
  },
}
