<script setup lang="ts">
// Renders raw SVG markup inline so it can be coloured with CSS `color`.
defineProps<{ svg: string }>()
</script>

<template>
  <span class="nav-icon" aria-hidden="true" v-html="svg"></span>
</template>

<style scoped>
.nav-icon {
  display: inline-flex;
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
}

.nav-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>
