import { defineStore } from 'pinia'
import { computed, readonly, type Ref, ref } from 'vue'
import type { CreateSourcePayload } from '@/core/stores/SourceStore.ts'
import { ArticleDao } from '@/core/database/ArticleDao.ts'
import type { Article } from '@/core/database/db.ts'

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
  const total = ref(0)
  const articles: Ref<any[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedArticleId: Ref<string | null> = ref(null)
  const data = computed(() => {
    return articles.value.find((item: any): boolean => item.fid == selectedArticleId.value)
  })

  async function retrieveArticles(index: number = 0, size: number = 5) {
    const response = await ArticleDao.getAll({ offset: index, limit: size })
    articles.value = response.articles
    total.value = response.total
  }

  const create = async (article: Omit<Article, 'id' | 'saved_at'>) => {
    loading.value = true
    try {
      await ArticleDao.addIfNotExists(article)
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    total: readonly(total),
    articles: readonly(articles),
    loading: readonly(loading),

    create,
    retrieveArticles,
  }
})
