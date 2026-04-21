<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { datePipe } from '@/shared/service/DateFormatter.ts'
import { useArticleStore } from '@/core/stores/ArticleStore.ts'
import { useMarked } from '@/shared/service/marked.ts'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const loading = ref(false)
const router = useRouter()
const article = ref<any>(null)
const { formatDate } = datePipe()
const fid = ref(router.currentRoute.value.params.fid as string)
const articleStore = useArticleStore()

const renderedContent = computed(() => {
  if (!article.value.summary) return ''
  const html = marked.parse(article.value.summary, { async: false }) as string
  return DOMPurify.sanitize(html)
})

const retrieveArticle = async () => {
  loading.value = true
  const data = await articleStore.findArticle(Number(fid.value))
  if (data) article.value = data
}

onMounted(() => {
  if (fid.value) retrieveArticle()
})
</script>

<template>
  <main class="maw-w-screen w-screen min-h-screen bg-gray-900 py-20 px-10">
    <div class="flex justify-center gap-5">
      <div class="w-[95%] sm:w-[70%]">
        <a target="_blank" :href="article?.link" class="text-2xl text-indigo-500 font-bold mb-5">{{
          article?.title
        }}</a>
        <img class="w-full" v-if="article?.image" :src="article?.image" :alt="article?.title" />
        <div
          class="mb-10 prose prose-invert prose-indigo article-content"
          v-if="article?.summary"
          v-html="renderedContent"
        ></div>
        <div class="flex justify-between text-sm italic font-thin text-gray-100">
          <span>
            Source :
            <a :href="article?.link" target="_blank" class="underline underline-offset-4">
              {{ article?.feed?.name }}
            </a>
            - {{ article?.author || 'Inconnu' }}
          </span>
          <span>{{ formatDate(article?.fetched_at, 'medium') }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.article-content :deep(p) {
  margin-bottom: 1rem;
}
.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
}
.article-content :deep(a) {
  color: #4db8ff;
  text-decoration: underline;
}
</style>
