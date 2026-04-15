<script setup lang="ts">
import Navbar from '@/shared/components/Navbar.vue'
import Scrapping from '@/shared/components/Scrapping.vue'
import Footer from '@/shared/components/Footer.vue'
import { RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/core/stores/UserStore.ts'

const router = useRouter()
const userStore = useUserStore()
const socket = new WebSocket('ws://localhost:3000/ws/borisaxel')

socket.onmessage = (event) => {
  console.log(event)
  console.log('Message from server ', event.data)
}

onMounted(() => {
  if (!userStore.getMe) router.push('/')
})
</script>

<template>
  <Scrapping />
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
