<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalItems: number
  itemsPerPage: number
  currentPage: number
}>()

const emit = defineEmits(['change-page'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('change-page', page)
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mt-8 text-white">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
    >
      Précédent
    </button>

    <span>Page {{ currentPage }} sur {{ totalPages }}</span>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
    >
      Suivant
    </button>
  </div>
</template>
