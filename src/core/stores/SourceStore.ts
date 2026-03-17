import { ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { SourceStatus, SourceType } from '@/core/database/DbType.ts'
import type { Source } from '@/core/database/db.ts'
import { SourcesDao } from '@/core/database/SourceDao.ts'


export interface CreateSourcePayload {
  name: string
  url: string
}


export const useSourcesStore = defineStore('sources', () => {
  const sources = ref<Source[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSources() {
    isLoading.value = true
    error.value = null

    try {
      sources.value = await SourcesDao.getAll()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      isLoading.value = false
    }
  }

  async function addSource(payload: CreateSourcePayload | any): Promise<boolean> {
    error.value = null

    try {
      await SourcesDao.add(payload)
      await fetchSources()
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    }
  }

  async function updateSource(
    id: number,
    changes: Partial<Omit<Source, 'id' | 'created_at'>>,
  ): Promise<boolean> {
    error.value = null

    try {
      await SourcesDao.update(id, changes)
      await fetchSources()
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    }
  }

  async function toggleSource(id: number, currentStatus: SourceStatus): Promise<boolean> {
    const next: SourceStatus = currentStatus === 'active' ? 'paused' : 'active'
    return updateSource(id, { status: next })
  }

  async function removeSource(id: number): Promise<boolean> {
    error.value = null

    try {
      await SourcesDao.remove(id)
      sources.value = sources.value.filter((s) => s.id !== id)
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    }
  }

  return {
    sources: readonly(sources),
    isLoading: readonly(isLoading),
    error: readonly(error),

    fetchSources,
    addSource,
    updateSource,
    toggleSource,
    removeSource,
  }
})
