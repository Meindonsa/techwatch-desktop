<script setup lang="ts">
import { computed, ref } from 'vue'
import { hasInvalidString, isUrl } from '@/shared/service/Utils.ts'
import Button from '@/shared/components/Button.vue'
import UseWatcher from '@/shared/api/Watcher.ts'

const useWatcher = UseWatcher()
const label = ref<string>('Enregister')
const loading = ref<boolean>(false)
const emit = defineEmits(['onCancel', 'onSave'])
const form = ref({
  name: '',
  url: '',
})

const isValid = computed(() => {
  return (
    hasInvalidString(form.value.name, form.value.url) || !isUrl(form.value.url) || loading.value
  )
})

const onCancel = () => {
  emit('onCancel')
}

const onclick = async () => {
  const url = form.value.url
  if (!isUrl(form.value.url)) return null
  label.value = 'Détection du flux ...'
  loading.value = true
  await useWatcher
    .detect(url)
    .then((result) => {
      const res = { name: form.value.name, ...result.data }
      emit('onSave', res)
    })
    .catch((e) => {
      return
    })
    .finally(() => {
      label.value = 'Enregister'
      loading.value = false
    })
}

async function detect() {}
</script>

<template>
  <input
    type="text"
    v-model="form.name"
    class="w-full px-3 py-2 mb-5 border border-white text-heading text-sm rounded-sm placeholder:text-gray-500 text-white"
    placeholder="Nom de la source"
  />

  <input
    type="text"
    v-model="form.url"
    class="w-full px-3 py-2 mb-5 border border-white text-heading text-sm rounded-sm placeholder:text-gray-500 text-white"
    placeholder="Url de la source"
  />
  <div class="w-full flex justify-between">
    <Button label="Annuler" @onclick="onCancel" severity="secondary" />
    <Button :label="label" @onclick="onclick" :disabled="isValid" severity="primary" />
  </div>
</template>

<style scoped></style>
