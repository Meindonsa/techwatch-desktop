<script setup lang="ts">
import { datePipe } from '@/shared/service/DateFormatter.ts'

defineProps(['article'])
const { formatDate } = datePipe()

</script>

<template>
  <RouterLink
    :to="'article/' + article.id"
    class="flex flex-col bg-neutral-primary-soft p-2 mb-3 border border-gray-500 transition ease-in-out duration-300 hover:border-gray-50 rounded-base shadow-xs cursor-pointer"
  >
    <div class="flex flex-col justify-between md:p-4 leading-normal">
      <h5 class="mb-2 text-md font-bold text-indigo-500">
        {{ article.title }}
      </h5>
      <div class="text-gray-300 mb-2 summary">{{ article.summary }}</div>
      <div class="flex justify-between w-full text-sm text-gray-500">
        <span>Depuis : <b class="text-gray-400">{{ article.feed.name }}</b> {{ ' par: ' + (article.author || 'Inconnu') }}</span>
        <span>{{ formatDate(article.fetched_at, 'mediumDate') }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.summary {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Nombre de lignes visibles (change selon tes besoins) */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;
  max-width: 100%;
}

@media (max-width: 726px) {
  .summary {
    -webkit-line-clamp: 2;
  }
}
</style>