<script setup lang="ts">
import { computed } from 'vue'
import '@/assets/markdown.css'
import { getProjectMarkdown } from '@/utils/projectAssets'
import { renderProjectMarkdown } from '@/utils/markdown'

const props = withDefaults(
  defineProps<{
    /** Folder name inside src/projects, e.g. "NAgine" */
    project: string
    /** Markdown file inside that folder */
    file?: string
  }>(),
  { file: 'content.md' },
)

const html = computed(() => {
  const source = getProjectMarkdown(props.project, props.file)
  return source ? renderProjectMarkdown(props.project, source) : ''
})
</script>

<template>
  <div v-if="html" class="md-content" v-html="html"></div>
</template>
