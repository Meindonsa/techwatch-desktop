<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useFilterStore } from '@/core/stores/filter.ts'
import ArticleITem from '@/shared/components/ArticleITem.vue'
import Paginator from '@/shared/components/Paginator.vue'
import Skeleton from '@/shared/components/Skeleton.vue'
import { useArticleStore } from '@/core/stores/ArticleStore.ts'
import { useFeedStore } from '@/core/stores/FeedStore.ts'

const route = useRoute()
const router = useRouter()
const feedStore = useFeedStore()
const articleStore = useArticleStore()

const feeds = computed(() => feedStore.sources)
const currentPage = computed(() => Number(route.query.page) || 1)
const totalElement = computed(() => articleStore.total)
const selectedFeed = computed(() => Number(route.query.feed) || 0)
const loading = ref(false)
const useFilter = useFilterStore()
const articles = computed(() => articleStore.articles)

const retrieveArticles = async (page = 1, feed: any = undefined) => {
  loading.value = true
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  setTimeout(async () => {
    try {
      const index = page - 1
      await articleStore.retrieveArticles(index, feed)
    } catch (e) {
      console.error('Erreur lors de la récupération :', e)
    } finally {
      loading.value = false
    }
  }, 1000)
}

const onChangeFeed = (event: any) => {
  const source = event.target.value
  let query: any = { page: 1 }
  if (source > 0) query = { ...query, feed: source }
  router.push({ path: '/articles', query: query })
}

const handlePageChange = (newPage: number) => {
  let query: any = { page: newPage }
  if (selectedFeed.value) query = { ...query, feed: selectedFeed.value }
  router.push({ path: '/articles', query: query })
}

watch(
  [currentPage, selectedFeed],
  ([newPage], [newFeed]) => {
    retrieveArticles(newPage, newFeed)
  },
  { immediate: true },
)

onMounted(() => {
  feedStore.fetchSources()
})
</script>

<template>
  <main class="maw-w-screen w-screen min-h-screen bg-gray-900 py-20 px-10">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white mb-10">Tous les articles</h1>
      <div>
        <select
          :value="selectedFeed"
          @change="onChangeFeed($event)"
          class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-50 text-gray-500 text-sm rounded-base shadow-xs placeholder:text-body"
        >
          <option :value="0" :selected="selectedFeed == 0">Sélectionnez la source</option>
          <option v-for="feed of feeds" :value="feed.id" :selected="selectedFeed == feed.id">
            {{ feed.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex gap-5">
      <div class="w-full">
        <Skeleton v-if="loading" :count="5" />
        <TransitionGroup v-if="!loading">
          <ArticleITem v-for="article in articles" :key="article?.id" :article="article" />
        </TransitionGroup>
        <Paginator
          :items-per-page="5"
          :total-items="totalElement"
          :current-page="currentPage"
          @change-page="handlePageChange"
        />
      </div>
    </div>
  </main>
</template>
