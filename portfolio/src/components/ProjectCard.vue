<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Project, Tag } from '@/types/project'
import tagsData from '@/data/tags.json'

const props = defineProps<{ project: Project }>()

// Every image in the thumbnails folder, keyed by its path so the JSON can refer to it.
const thumbnails = import.meta.glob<string>('@/assets/project thumbnails/*', {
  eager: true,
  import: 'default',
})

const tagColours = new Map((tagsData as Tag[]).map((t) => [t.name, t.colour]))
const FALLBACK_TAG_COLOUR = '#888888'

const thumbnailUrl = computed(() => thumbnails[`/src/assets/${props.project.thumbnail}`])

const tags = computed(() =>
  props.project.tags.map((name) => ({
    name,
    colour: tagColours.get(name) ?? FALLBACK_TAG_COLOUR,
  })),
)

const isExternal = computed(() => /^https?:\/\//.test(props.project.link))
</script>

<template>
  <article class="project-card">
    <div class="thumbnail" :class="{ 'is-cover': project.thumbnailFit === 'cover' }">
      <img v-if="thumbnailUrl" :src="thumbnailUrl" :alt="project.name" loading="lazy" />
    </div>

    <div class="body">
      <h3 class="name">{{ project.name }}</h3>

      <ul class="tags">
        <li v-for="tag in tags" :key="tag.name" class="tag" :style="{ backgroundColor: tag.colour }">
          {{ tag.name }}
        </li>
      </ul>

      <p class="description">{{ project.description }}</p>

      <a v-if="isExternal" :href="project.link" target="_blank" rel="noopener" class="details-btn">
        View Details <span class="chevron" aria-hidden="true">›</span>
      </a>
      <RouterLink v-else :to="project.link" class="details-btn">
        View Details <span class="chevron" aria-hidden="true">›</span>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  overflow: hidden;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.project-card:hover {
  box-shadow: 0 6px 18px var(--color-shadow);
  transform: translateY(-2px);
}

/* ---------- Thumbnail: roughly the top half of the card ---------- */
.thumbnail {
  aspect-ratio: 16 / 10;
  background: var(--color-bg-alt);
}

.thumbnail img {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0.75rem;
  object-fit: contain; /* show the whole image instead of cropping it */
  image-rendering: pixelated; /* keeps small pixel-art icons crisp when scaled up */
}

/* Per-project opt-in to fill the frame (crops the edges): "thumbnailFit": "cover" */
.thumbnail.is-cover img {
  padding: 0;
  object-fit: cover;
  image-rendering: auto;
}

/* ---------- Text area ---------- */
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem 1.5rem;
}

.name {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.3;
  color: var(--color-heading);
  overflow-wrap: anywhere;
}

.tags {
  list-style: none;
  padding: 0;
  margin-top: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  padding: 0.15rem 0.75rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
}

/* Red bar on the left, like the platform label on Nintendo's cards */
.description {
  margin-top: 0.75rem;
  padding-left: 0.6rem;
  margin-bottom: 1.25rem; /* minimum gap above the button */
  border-left: 3px solid var(--color-accent);
  line-height: 1.4;
  color: var(--color-text);
}

/* margin-top: auto pins the button to the bottom so buttons line up across a row */
.details-btn {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  margin-top: auto;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1.1rem;
  border: 2px solid var(--color-accent);
  border-radius: 999px;
  font-weight: 700;
  color: var(--color-accent);
  /* The red fill: a solid gradient that grows from 0% to 100% width, left to right */
  background: linear-gradient(var(--color-accent), var(--color-accent)) left / 0% 100% no-repeat;
  transition:
    background-size 0.35s ease,
    color 0.35s ease;
}

.details-btn:hover,
.details-btn:focus-visible {
  background-size: 100% 100%;
  color: #fff;
}

/* The shine: a slanted white streak that sweeps across once the fill has gone in */
.details-btn::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -75%;
  width: 50%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-20deg);
  pointer-events: none;
  z-index: -1;
}

.details-btn:hover::after,
.details-btn:focus-visible::after {
  animation: btn-shine 0.6s ease 0.25s;
}

@keyframes btn-shine {
  from {
    left: -75%;
  }
  to {
    left: 125%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .details-btn:hover::after,
  .details-btn:focus-visible::after {
    animation: none;
  }
}

.chevron {
  font-size: 1.3em;
  line-height: 1;
  transition: transform 0.15s;
}

.details-btn:hover .chevron {
  transform: translateX(3px);
}
</style>
