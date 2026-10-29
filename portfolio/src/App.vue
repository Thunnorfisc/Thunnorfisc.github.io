<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <NavBar />
  <main class="main">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<style scoped>
.main {
  flex: 1;
}
</style>
