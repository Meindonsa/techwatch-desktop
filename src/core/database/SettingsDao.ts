import { db, type Settings } from '@/core/database/db.ts'

export const SettingsDao = {
  async get(key: string): Promise<string | null> {
    const row = await db.settings.get(key)
    return row?.value ?? null
  },

  set(key: string, value: string | number | boolean): Promise<string> {
    return db.settings.put({ key, value: String(value) })
  },

  async getAll(): Promise<Settings> {
    const rows = await db.settings.toArray()
    return Object.fromEntries(rows.map((r) => [r.key, r.value])) as Settings
  },
}
