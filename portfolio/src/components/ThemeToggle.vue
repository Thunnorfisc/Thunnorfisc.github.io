<script setup lang="ts">
import { computed } from 'vue'
import sunIcon from '@/assets/sun.svg?raw'
import moonIcon from '@/assets/moon.svg?raw'
import { theme, toggleTheme } from '@/utils/theme'

// Shows the mode you'll switch TO: a sun while dark, a moon while light
const icon = computed(() => (theme.value === 'dark' ? sunIcon : moonIcon))
const label = computed(() => `Switch to ${theme.value === 'dark' ? 'light' : 'dark'} mode`)
</script>

<template>
  <button type="button" class="theme-toggle" :aria-label="label" :title="label" @click="toggleTheme">
    <Transition name="spin" mode="out-in">
      <span :key="theme" class="theme-icon" aria-hidden="true" v-html="icon"></span>
    </Transition>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-bg-alt);
  color: var(--color-heading);
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.theme-icon {
  display: block;
  width: 1.35rem;
  height: 1.35rem;
}

/* The sun/moon SVGs are line drawings: colour their strokes, never fill them */
.theme-icon :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  fill: none;
}

.theme-icon :deep(path),
.theme-icon :deep(circle) {
  stroke: currentColor;
}

/* Icon swaps with a quick spin */
.spin-enter-active,
.spin-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.spin-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.spin-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>
