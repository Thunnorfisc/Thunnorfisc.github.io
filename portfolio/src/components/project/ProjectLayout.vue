<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ title: string }>()

const backTo = { path: '/', hash: '#projects' }
</script>

<template>
  <article class="project-page">
    <RouterLink :to="backTo" class="back-link">
      <span class="chevron" aria-hidden="true">‹</span> Back to Projects
    </RouterLink>

    <h1 class="project-title">{{ title }}</h1>

    <slot />

    <footer class="project-footer">
      <RouterLink :to="backTo" class="back-link">
        <span class="chevron" aria-hidden="true">‹</span> Back to Projects
      </RouterLink>
    </footer>
  </article>
</template>

<style scoped>
.project-page {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0; /* bigger click area */
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-accent);
}

.back-link .chevron {
  font-size: 1.6em;
  line-height: 1;
  margin-top: -0.1em; /* optical centring */
  transition: transform 0.15s ease;
}

.back-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.back-link:hover .chevron {
  transform: translateX(-3px);
}

.project-title {
  margin: 0.5rem 0 1.5rem;
  font-size: 2.25rem;
  line-height: 1.2;
  color: var(--color-accent-darker);
}

.project-footer {
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}
</style>
