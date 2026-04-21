<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProfileMenu, SourceFilters } from '@/shared/service/NavbarData.ts'
import { useFilterStore } from '@/core/stores/filter.ts'
import SearchbBar from '@/shared/components/SearchbBar.vue'
import Dropdown from '@/shared/components/Dropdown.vue'
import { useUserStore } from '@/core/stores/UserStore.ts'
import { useRouter } from 'vue-router'
import { useScrappingStore } from '@/core/stores/ScrappingStore.ts'

const userStore = useUserStore()
const filters = ref(SourceFilters)
const useFilter = useFilterStore()
const scrappingStore = useScrappingStore()

const menu = ProfileMenu
const filter = ref('ALL')
const router = useRouter()
const isRunning = computed(() => scrappingStore.isRunning)

const isActive = (name: string) => {
  const activated = filter.value == name
  return activated ? 'text-white underline underline-offset-8' : 'text-gray-500'
}

const onFilter = (name: string) => {
  if (name == filter.value) return
  filter.value = name
  useFilter.setFilter(name)
}

const onProfileClick = (action: string) => {
  if (action == 'LOGOUT') {
    userStore.logout()
    router.push('/')
  }
}

const reloadArticle = () => {
  scrappingStore.reload()
}
</script>

<template>
  <nav class="bg-gray-950 fixed w-full z-20 top-0 start-0 border-b border-b-gray-900">
    <div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-7" alt="Flowbite Logo" />
        <span class="self-center text-xl text-white text-heading font-semibold whitespace-nowrap">
          Tech-watch
        </span>
      </RouterLink>
      <SearchbBar />
      <div class="flex items-center">
        <button
          @click="reloadArticle()"
          class="size-7.5 text-2xl flex justify-center items-center cursor-pointer me-5"
        >
          <i class="bx bx-refresh" :class="isRunning ? ' spin text-indigo-500' : 'text-white'"></i>
        </button>
        <Dropdown icon="bx bx-user-circle" @onClick="onProfileClick($event)" :options="menu" />
      </div>

      <!--      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary"
        >
          <li v-for="item of filters">
            <a
              @click="onFilter(item.name)"
              :class="isActive(item.name)"
              class="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 cursor-pointer"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>-->
    </div>
  </nav>
</template>

<style scoped>
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
