<script setup lang="ts">
import ProjectLayout from '@/components/project/ProjectLayout.vue'
import ProjectCarousel from '@/components/project/ProjectCarousel.vue'
import ProjectDetails from '@/components/project/ProjectDetails.vue'
import ProjectContent from '@/components/project/ProjectContent.vue'
</script>

<template>
  <ProjectLayout title="Dungeons &amp; Deadlines">
    <ProjectCarousel project="DungeonsAndDeadlines" />
    <ProjectDetails project="DungeonsAndDeadlines" />
    <ProjectContent project="DungeonsAndDeadlines" />
  </ProjectLayout>
</template>
