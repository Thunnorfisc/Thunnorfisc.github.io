<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectCard from './ProjectCard.vue'
import TagFilter from './TagFilter.vue'
import type { Project, Tag } from '@/types/project'
import projectsData from '@/data/projects.json'
import tagsData from '@/data/tags.json'

const projects = projectsData as Project[]
const tags = tagsData as Tag[]

// Everything starts switched on
const activeTags = ref<string[]>(tags.map((t) => t.name))

// A project shows if it has at least one of the switched-on tags
const visibleProjects = computed(() =>
  projects.filter((p) => p.tags.some((t) => activeTags.value.includes(t))),
)
</script>

<template>
  <TagFilter v-model="activeTags" :tags="tags" />

  <TransitionGroup v-if="visibleProjects.length" tag="div" name="card" class="project-grid">
    <ProjectCard v-for="project in visibleProjects" :key="project.name" :project="project" />
  </TransitionGroup>

  <p v-else class="empty">No projects match the selected tags.</p>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem;
  margin-top: 2rem;
}

@media (max-width: 900px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 580px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}

.empty {
  margin-top: 2rem;
  color: var(--color-muted);
}

/* Cards fade in/out when the filter changes */
.card-enter-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>
