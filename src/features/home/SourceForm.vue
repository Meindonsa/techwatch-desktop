<script setup lang="ts">
import { computed, ref } from 'vue'
import { hasInvalidString, isUrl } from '@/shared/service/Utils.ts'
import Button from '@/shared/components/Button.vue'
import UseWatcher from '@/shared/api/Watcher.ts'
import { useFeedStore } from '@/core/stores/FeedStore.ts'

const feedStore = useFeedStore()
const label = ref<string>('Enregister')
const loading = ref<boolean>(false)
const emit = defineEmits(['onCancel', 'onSave'])
const url = ref('')

const isValid = computed(() => {
  return !isUrl(url.value) || loading.value
})

const onCancel = () => {
  emit('onCancel')
}

const onclick = () => {
  if (!isUrl(url.value)) return null
  emit('onSave', url.value)
}

async function detect() {}
</script>

<template>
  <input
    type="text"
    v-model="url"
    class="w-full px-3 py-2 mb-5 border border-white text-heading text-sm rounded-sm placeholder:text-gray-500 text-white"
    placeholder="Url de la source"
  />
  <div class="w-full flex justify-between">
    <Button label="Annuler" @onclick="onCancel" severity="secondary" />
    <Button :label="label" @onclick="onclick" :disabled="isValid" severity="primary" />
  </div>
</template>

<style scoped></style>
