<script setup lang="ts">
import { computed } from 'vue'
import type { Tag } from '@/types/project'

const props = defineProps<{ tags: Tag[] }>()

// v-model: the names of the tags that are currently switched on
const active = defineModel<string[]>({ required: true })

const allOn = computed(() => props.tags.every((t) => active.value.includes(t.name)))

function toggle(name: string) {
  active.value = active.value.includes(name)
    ? active.value.filter((n) => n !== name)
    : [...active.value, name]
}

function toggleAll() {
  active.value = allOn.value ? [] : props.tags.map((t) => t.name)
}
</script>

<template>
  <div class="tag-filter" role="group" aria-label="Filter projects by tag">
    <button
      type="button"
      class="filter-btn all-btn"
      :class="{ 'is-on': allOn }"
      :aria-pressed="allOn"
      @click="toggleAll"
    >
      All
    </button>

    <button
      v-for="tag in tags"
      :key="tag.name"
      type="button"
      class="filter-btn"
      :class="{ 'is-on': active.includes(tag.name) }"
      :style="{ '--tag-colour': tag.colour }"
      :aria-pressed="active.includes(tag.name)"
      @click="toggle(tag.name)"
    >
      {{ tag.name }}
    </button>
  </div>
</template>

<style scoped>
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

/* Off: outlined in the tag's colour. On: filled with it. */
.filter-btn {
  --tag-colour: var(--color-muted);
  padding: 0.35rem 1rem;
  border: 2px solid var(--tag-colour);
  border-radius: 999px;
  background: transparent;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--tag-colour);
  cursor: pointer;
  transition:
    background-color 0.15s,
    color 0.15s,
    transform 0.1s;
}

.filter-btn.is-on {
  background: var(--tag-colour);
  color: #fff;
}

.filter-btn:hover {
  transform: translateY(-1px);
}

.filter-btn:active {
  transform: translateY(0);
}

.filter-btn:focus-visible {
  outline: 2px solid var(--tag-colour);
  outline-offset: 2px;
}

.all-btn {
  --tag-colour: var(--color-accent-strong-bg);
}
</style>
