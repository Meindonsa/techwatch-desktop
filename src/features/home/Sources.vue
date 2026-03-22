<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SourceForm from '@/features/home/SourceForm.vue'
import { isUrl } from '@/shared/service/Utils.ts'
import { useSourcesStore } from '@/core/stores/SourceStore.ts'
import useToasterStore from '@/core/stores/UseToasterStore.ts'
import { useScrappingStore } from '@/core/stores/ScrappingStore.ts'

const loading = ref(false)
const errorMessage = ref<null | string>(null)
const showSource = ref(false)
const sourcesStore = useSourcesStore()
const toasterStore = useToasterStore()
const scrappingSource = useScrappingStore()

const sources = computed(() => sourcesStore.sources)

const hideForm = () => {
  showSource.value = !showSource.value
}

const onSubmit = (event: any) => {
  loading.value = true
  const req = {
    name: event.name,
    url: event.originalUrl,
    feed_url: event.feedUrl,
  }
  sourcesStore
    .addSource(req)
    .then(() => {
      hideForm()
      toasterStore.success({ text: `${req.name} enrgistré avec succès !` })
      scrappingSource.scrap(req.feed_url);
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
}

const onDelete = (event: any) => {
  loading.value = true
  sourcesStore
    .removeSource(event.id)
    .then(() => {
      toasterStore.success({ text: `${event.name} supprimé avec succès !` })
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => sourcesStore.fetchSources())
</script>

<template>
  <div
    class="w-full max-w-sm p-6 bg-neutral-primary-soft border border-gray-500 rounded-base shadow-xs"
  >
    <h5
      class="flex justify-between mb-4 text-xl font-semibold leading-none text-heading text-white"
    >
      <span>Sources</span>
      <span class="cursor-pointer" @click="hideForm">+</span>
    </h5>
    <Transition>
      <span v-if="errorMessage != null" class="text-red-500 text-sm font-light">{{
        errorMessage
      }}</span>
    </Transition>
    <div class="flow-root mt-3">
      <SourceForm v-if="showSource" @onCancel="hideForm" @onSave="onSubmit($event)" />
      <div class="text-center text-gray-700" v-if="loading">Chargement ...</div>
      <TransitionGroup
        v-if="!showSource"
        tag="ul"
        mode="easy-in-out"
        role="list"
        class="divide-default text-gray-300"
      >
        <li
          v-for="source of sources"
          :key="source?.id"
          class="source text-sm flex justify-between items-center text-body truncate mb-2 hover:text-indigo-500 transition ease-in-out duration-300"
        >
          <a
            :href="source?.url"
            target="_blank"
            class="cursor-pointer hover:underline hover:underline-offset-4"
          >
            {{ source?.name }}
          </a>
          <i class="bx bx-trash cursor-pointer" @click="onDelete(source)"></i>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.source {
  i {
    display: none;
  }
  &:hover {
    i {
      display: inline-block;
    }
  }
}
</style>
