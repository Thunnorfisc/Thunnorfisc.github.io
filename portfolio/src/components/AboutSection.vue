<script setup lang="ts">
import DetailList from '@/components/DetailList.vue'
import type { DetailItem } from '@/types/project'
import { getProjectIcon } from '@/utils/projectAssets'
import { renderMarkdown } from '@/utils/markdown'
import '@/assets/markdown.css'
import photo from '@/assets/Me Photo.jpeg'
import detailsData from '@/about/details.json'
import introMarkdown from '@/about/content.md?raw'

// Icons come from src/projects/General
const details = (detailsData as DetailItem[]).map((d) => ({
  ...d,
  svg: getProjectIcon('General', d.icon) ?? '',
}))

const introHtml = renderMarkdown(introMarkdown)
</script>

<template>
  <div class="about">
    <div class="about-top">
      <img :src="photo" alt="Photo of William Wibisana Dumanauw" class="about-photo" />
      <DetailList :items="details" :columns="1" class="about-details" />
    </div>

    <div class="md-content about-intro" v-html="introHtml"></div>
  </div>
</template>

<style scoped>
.about {
  margin-top: 2rem;
}

.about-top {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 3rem;
  align-items: start;
}

.about-photo {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 6px 18px var(--color-shadow);
}

/* Red titles and icons in About Me only (project pages keep the grey ones) */
.about-details :deep(.detail-title),
.about-details :deep(.detail-icon) {
  color: var(--color-accent);
}

.about-intro {
  margin-top: 2.5rem;
}

@media (max-width: 760px) {
  .about-top {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-photo {
    max-width: 280px;
    margin: 0 auto;
  }
}
</style>
