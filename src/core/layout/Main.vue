<script setup lang="ts">
import Toaster from '@/shared/components/Toaster.vue'
import Navbar from '@/shared/components/Navbar.vue'
import Scrapping from '@/shared/components/Scrapping.vue'
import Footer from '@/shared/components/Footer.vue'
import { RouterView } from 'vue-router'

const socket = new WebSocket('ws://localhost:3000/ws/borisaxel')

socket.onmessage = (event) => {
  console.log(event)
  console.log('Message from server ', event.data)
}
</script>

<template>
  <Toaster />
  <Scrapping />
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
