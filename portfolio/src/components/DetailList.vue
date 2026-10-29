<script setup lang="ts">
import NavIcon from '@/components/NavIcon.vue'

export interface DetailListItem {
  title: string
  /** Raw SVG markup for the icon */
  svg: string
  description: string
}

withDefaults(defineProps<{ items: DetailListItem[]; columns?: number }>(), { columns: 2 })
</script>

<template>
  <dl class="details-grid" :style="{ '--columns': columns }">
    <div v-for="item in items" :key="item.title" class="detail">
      <dt class="detail-title">
        <NavIcon :svg="item.svg" class="detail-icon" />
        <span>{{ item.title }}</span>
      </dt>
      <dd class="detail-description">{{ item.description }}</dd>
    </div>
  </dl>
</template>

<style scoped>
/* Lines between rows mimic Nintendo's "About this item" table */
.details-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  column-gap: 3rem;
  border-top: 1px solid var(--color-border);
}

.detail {
  padding: 1.25rem 0.25rem;
  border-bottom: 1px solid var(--color-border);
}

.detail-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
}

.detail-icon {
  font-size: 1.4rem; /* icon size scales with this */
  color: var(--color-heading);
}

.detail-description {
  margin: 0.4rem 0 0;
  padding-left: calc(1.4rem * 1.25 + 0.75rem); /* lines up with the title text */
  line-height: 1.5;
  color: var(--color-text);
}

@media (max-width: 640px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
