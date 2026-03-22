<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useFilterStore } from '@/core/stores/filter.ts'
import ArticleITem from '@/features/home/ArticleITem.vue'
import Paginator from '@/shared/components/Paginator.vue'
import Skeleton from '@/shared/components/Skeleton.vue'
import { useArticleStore } from '@/core/stores/ArticleStore.ts'

const route = useRoute()
const router = useRouter()
const currentPage = computed(() => Number(route.query.page) || 1)
const articleStore = useArticleStore()

const totalElement = computed(() => useArticleStore().total)
const sizeOfElement = ref(5)
const loading = ref(false)
const useFilter = useFilterStore()
const searchValue = computed(() => useFilter.searchValue)
const articles = computed(() => useArticleStore().articles)
const pagination = ref({ total: 0, page: 0, size: 5 })

const retrieveArticles = async (index = 0) => {
  loading.value = true
  try {
    await articleStore.retrieveArticles(index, sizeOfElement.value)
  } catch (e) {
    console.error('Erreur lors de la récupération :', e)
  } finally {
    loading.value = false
  }
}

const onChangeElementPerPage = async (event: any) => {
  sizeOfElement.value = event.target.value
  await retrieveArticles()
}

const handlePageChange = (newPage: number) => {
  goToPage(newPage + 1)
}

const goToPage = (page: number) => {
  router.push({ path: '/articles', query: { page } })
}

watch(
  currentPage,
  (newPage) => {
    console.log('Chargement page', newPage)
    retrieveArticles(newPage - 1)
  },
  { immediate: true },
)
</script>

<template>
  <main class="maw-w-screen w-screen min-h-screen bg-gray-900 py-20 px-10">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white mb-10">Tous les articles</h1>
      <div>
        <select
          :value="sizeOfElement"
          @change="onChangeElementPerPage($event)"
          class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-50 text-gray-500 text-sm rounded-base shadow-xs placeholder:text-body"
        >
          <option value="5">5 par page</option>
          <option value="10">10 par page</option>
          <option value="15">15 par page</option>
          <option value="20">20 par page</option>
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
          :total-items="totalElement"
          :items-per-page="sizeOfElement"
          :current-page="pagination.page"
          @change-page="handlePageChange"
        />
        <div class="text-center py-5"></div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
