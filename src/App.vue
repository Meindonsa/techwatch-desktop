<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/shared/components/Navbar.vue'
import Footer from '@/shared/components/Footer.vue'
import Toaster from '@/shared/components/Toaster.vue'
import Scrapping from '@/shared/components/Scrapping.vue'
</script>

<template>
  <Toaster />
  <Scrapping/>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
