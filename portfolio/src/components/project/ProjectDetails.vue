<script setup lang="ts">
import { computed } from 'vue'
import DetailList from '@/components/DetailList.vue'
import type { DetailItem } from '@/types/project'
import { getProjectData, getProjectIcon } from '@/utils/projectAssets'

const props = defineProps<{
  /** Folder name inside src/projects, e.g. "NAgine" */
  project: string
}>()

const details = computed(() =>
  (getProjectData<DetailItem[]>(props.project, 'details.json') ?? []).map((d) => ({
    ...d,
    svg: getProjectIcon(props.project, d.icon) ?? '',
  })),
)
</script>

<template>
  <section v-if="details.length" class="details">
    <h2 class="details-heading">Details</h2>
    <DetailList :items="details" :columns="2" />
  </section>
</template>

<style scoped>
.details {
  margin-top: 3rem;
}

.details-heading {
  font-size: 1.75rem;
  color: var(--color-accent-darker);
  margin-bottom: 1rem;
}
</style>
