<script setup lang="ts">
import { useScrappingStore } from '@/core/stores/ScrappingStore.ts'
import { computed } from 'vue'

const scrappingStore = useScrappingStore()
const label = computed(() => scrappingStore.state)
</script>

<template>
  <Teleport to="body">
    <Transition name="scrapping">
      <div v-if="label" class="scrapping_class">
        {{ label }}
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.scrapping-enter-active,
.scrapping-leave-active {
  transition: all 0.5s ease;
}
.scrapping-enter-from,
.scrapping-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.scrapping_class {
  background: #030712;
  position: fixed;
  bottom: 5px;
  border-radius: 3px;
  left: 3%;
  z-index: 1000;
  color: #615FFF; /*#00dc82;*/
  font-size: 12px;
  padding: 0.3rem 1rem;
  box-shadow: 0 0 20px #030712;
  font-style: italic;
}
</style>
