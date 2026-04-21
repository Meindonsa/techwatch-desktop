import { ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { Feed } from '@/core/database/db.ts'
import { FeedDao } from '@/core/database/FeedDao.ts'
import FeedService from '@/shared/api/FeedService.ts'
import { useUserStore } from '@/core/stores/UserStore.ts'
import { useArticleStore } from '@/core/stores/ArticleStore.ts'

export interface CreateSourcePayload {
  name: string
  url: string
}

export const useFeedStore = defineStore('sources', () => {
  const articleStore = useArticleStore()
  const userStore = useUserStore()
  const sources = ref<Feed[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSources() {
    isLoading.value = true
    error.value = null

    try {
      sources.value = await FeedDao.getAll()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      isLoading.value = false
    }
  }

  const subscribe = (payload: any) => {
    return FeedService.subscribe(userStore.getMe()?.username, payload)
  }

  const reloadSource = (withArticles: boolean = false, feedId: number) => {
    FeedService.retrieveFeeds(userStore.getMe()?.username).then(async (feeds: any) => {
      const numbers: number = await FeedDao.bulkAddIfNotExists(feeds.data)
      if (numbers > 0) getFeeds()
      if (withArticles && feedId > 0) articleStore.loadFeedArticles(feedId)
    })
  }

  const getFeeds = () => {
    FeedDao.getAll().then((res) => {
      sources.value = res
    })
  }

  async function addSource(payload: CreateSourcePayload | any): Promise<boolean> {
    error.value = null

    try {
      await FeedDao.add(payload)
      await fetchSources()
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    }
  }

  async function removeSource(id: number): Promise<boolean> {
    error.value = null

    try {
      await FeedService.unsubscribe(userStore.getMe()?.username, id)
      await FeedDao.remove(id)
      sources.value = sources.value.filter((s: Feed) => s.id !== id)
      await fetchSources()
      getFeeds()
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

    subscribe,
    addSource,
    reloadSource,
    removeSource,
    fetchSources,
  }
})
