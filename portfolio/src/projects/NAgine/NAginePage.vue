<script setup lang="ts">
import ProjectLayout from '@/components/project/ProjectLayout.vue'
import ProjectCarousel from '@/components/project/ProjectCarousel.vue'
import ProjectDetails from '@/components/project/ProjectDetails.vue'
import ProjectContent from '@/components/project/ProjectContent.vue'
</script>

<template>
  <ProjectLayout title="NAgine / Sodium Engine">
    <ProjectCarousel project="NAgine" />
    <ProjectDetails project="NAgine" />
    <ProjectContent project="NAgine" />
  </ProjectLayout>
</template>
