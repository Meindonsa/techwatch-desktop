import { defineStore } from 'pinia'
import { computed, readonly, type Ref, ref } from 'vue'
import { ArticleDao } from '@/core/database/ArticleDao.ts'
import { ArticleService } from '@/shared/api/ArticleService.ts'
import { useUserStore } from '@/core/stores/UserStore.ts'

export interface CreateArticlePayload {
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
export const useArticleStore = defineStore('article', () => {
  const userStore = useUserStore()
  const total = ref(0)
  const articles: Ref<any[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedArticleId: Ref<string | null> = ref(null)
  const data = computed(() => {
    return articles.value.find((item: any): boolean => item.fid == selectedArticleId.value)
  })

  async function retrieveArticles(index: number = 0,feed_id:number|undefined = undefined, size: number = 5) {
    const offset = index * size
    const response = await ArticleDao.getAll({ sourceId:feed_id, offset:offset, limit: size })
    articles.value = response.articles
    total.value = response.total
  }

  const loadArticles = () => {
    ArticleService.retrieveArticles(userStore.getMe()?.username).then(async (response) => {
      try {
        await ArticleDao.bulkAddIfNotExists(response.data)
        await retrieveArticles()
      } catch (e) {
        error.value = (e as Error).message
      } finally {
        loading.value = false
      }
    })
  }

  const findArticle = async (id: number) => {
    try {
      return await ArticleDao.find(id)
    } catch (e) {
      error.value = (e as Error).message
      return null
    }
  }

  const loadFeedArticles = (feedId: number) => {
    ArticleService.retrieveFeedArticles(userStore.getMe()?.username, feedId).then(
      async (response) => {
        try {
          await ArticleDao.addIfNotExists(response.data)
          await retrieveArticles()
        } catch (e) {
          error.value = (e as Error).message
        } finally {
          loading.value = false
        }
      },
    )
  }

  return {
    total: readonly(total),
    articles: readonly(articles),
    loading: readonly(loading),

    findArticle,
    loadArticles,
    loadFeedArticles,
    retrieveArticles,
  }
})
