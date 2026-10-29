<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p>&copy; {{ year }} William Wibisana Dumanauw</p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-muted);
  background: var(--color-bg-alt);
  border-top: 1px solid var(--color-border);
}
</style>
