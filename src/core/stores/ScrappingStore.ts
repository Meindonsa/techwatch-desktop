import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { Feed } from '@/core/database/db.ts'
import { useArticleStore } from '@/core/stores/ArticleStore.ts'
import { ArticleService } from '@/shared/api/ArticleService.ts'
import { ArticleDao } from '@/core/database/ArticleDao.ts'
import { useUserStore } from '@/core/stores/UserStore.ts'

export const useScrappingStore = defineStore('scrapping', () => {
  const articleStore = useArticleStore()
  const userStore = useUserStore()

  const state: Ref<string> = ref<string>('')
  const sources: Ref<Feed[]> = ref<Feed[]>([])
  const isRunning: Ref<boolean> = ref(false)

  const reload = () => {
    isRunning.value = true
    state.value = "Scan d'article"
    ArticleService.retrieveArticles(userStore.getMe()?.username).then(async (response) => {
      try {
        if (response.data?.length > 0) {
          state.value = `Enregistrement de ${response.data.length} articles`
          await ArticleDao.bulkAddIfNotExists(response.data)
          state.value = `Enregistrement terminé`

          setTimeout(() => {
            state.value = ''
          }, 2000)
        } else {
          state.value = 'Scan terminé 0 article'
        }
      } catch (e) {
        console.error(e)
      } finally {
        isRunning.value = false
      }
    })
  }

  return {
    state,
    isRunning,

    reload,
  }
})
