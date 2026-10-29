<script setup lang="ts">
import ProjectLayout from '@/components/project/ProjectLayout.vue'
import ProjectCarousel from '@/components/project/ProjectCarousel.vue'
import ProjectDetails from '@/components/project/ProjectDetails.vue'
import ProjectContent from '@/components/project/ProjectContent.vue'
</script>

<template>
  <ProjectLayout title="StrokeNet">
    <ProjectCarousel project="StrokeNet" />
    <ProjectDetails project="StrokeNet" />
    <ProjectContent project="StrokeNet" />
  </ProjectLayout>
</template>
