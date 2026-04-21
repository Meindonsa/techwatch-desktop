<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps(['icon', 'label', 'options'])
const emit = defineEmits(['onClick'])

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: any) => {
  isOpen.value = false
  emit('onClick', option.action)
}

const handleClickOutside = (event: any) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative inline-block">
    <button @click="toggleDropdown" class="text-white text-xl cursor-pointer">
      <i :class="'bx ' + icon"></i> {{ label }}
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="py-1">
          <a
            v-for="option in options"
            :key="option.id"
            @click="selectOption(option)"
            class="text-white block px-4 py-2 text-sm hover:text-indigo-500 cursor-pointer"
          >
            <i :class="option.icon"></i> &nbsp; {{ option.label }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
