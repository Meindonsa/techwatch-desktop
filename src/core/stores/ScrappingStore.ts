import { defineStore } from 'pinia'
import UseWatcher from '@/shared/api/Watcher.ts'
import { type Ref, ref } from 'vue'
import type { Article, Feed } from '@/core/database/db.ts'

export const useScrappingStore = defineStore('scrapping', () => {
  const useWatcher = UseWatcher()

  const state: Ref<string> = ref<string>('')
  const sources: Ref<Feed[]> = ref<Feed[]>([])
  const isRunning: Ref<boolean> = ref(false)

  return {
    state,
  }
})
