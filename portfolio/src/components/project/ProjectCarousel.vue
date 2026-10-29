<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CarouselItem } from '@/types/project'
import { getProjectData, getProjectFile } from '@/utils/projectAssets'

const props = defineProps<{
  /** Folder name inside src/projects, e.g. "NAgine" */
  project: string
}>()

const items = computed(() =>
  (getProjectData<CarouselItem[]>(props.project, 'carousel.json') ?? []).map((item) => ({
    ...item,
    url: getProjectFile(props.project, item.src),
  })),
)

const index = ref(0)
const current = computed(() => items.value[index.value])

function goTo(i: number) {
  index.value = Math.max(0, Math.min(items.value.length - 1, i))
}
const next = () => goTo(index.value + 1)
const prev = () => goTo(index.value - 1)

// ---------- Videos: pause the one you slide away from ----------
const videoEls = new Map<number, HTMLVideoElement>()
function setVideoRef(i: number, el: unknown) {
  if (el instanceof HTMLVideoElement) videoEls.set(i, el)
  else videoEls.delete(i)
}
watch(index, (_, old) => videoEls.get(old)?.pause())

// ---------- Dragging (mouse) and swiping (touch) ----------
const viewport = ref<HTMLElement | null>(null)
const dragging = ref(false)
const dragOffset = ref(0) // px the track is currently pulled by

const DRAG_START_PX = 8 // movement before it counts as a drag rather than a click
const SWIPE_DISTANCE = 0.2 // fraction of the width needed to change slide...
const SWIPE_VELOCITY = 0.5 // ...or a quick flick (px per ms)

let pointerId: number | null = null
let startX = 0
let startY = 0
let startTime = 0
let justDragged = false

const VIDEO_CONTROLS_HEIGHT = 56 // px at the bottom of a video reserved for its controls

function onPointerDown(e: PointerEvent) {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  // Don't start a drag from the video's control bar (so scrubbing the timeline still works)
  if (e.target instanceof HTMLVideoElement) {
    const rect = e.target.getBoundingClientRect()
    if (e.clientY > rect.bottom - VIDEO_CONTROLS_HEIGHT) return
  }
  pointerId = e.pointerId
  startX = e.clientX
  startY = e.clientY
  startTime = performance.now()
}

function onPointerMove(e: PointerEvent) {
  if (e.pointerId !== pointerId) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY

  if (!dragging.value) {
    if (Math.abs(dx) < DRAG_START_PX) return
    // Mostly vertical: let the page scroll instead
    if (Math.abs(dy) > Math.abs(dx)) {
      pointerId = null
      return
    }
    dragging.value = true
    viewport.value?.setPointerCapture(e.pointerId)
  }

  // Rubber-band at the first/last slide
  const atEdge =
    (index.value === 0 && dx > 0) || (index.value === items.value.length - 1 && dx < 0)
  dragOffset.value = atEdge ? dx / 3 : dx
}

function onPointerUp(e: PointerEvent) {
  if (e.pointerId !== pointerId) return
  pointerId = null
  if (!dragging.value) return

  const width = viewport.value?.clientWidth ?? 1
  const dx = dragOffset.value
  const velocity = dx / Math.max(1, performance.now() - startTime)

  if (dx < -width * SWIPE_DISTANCE || velocity < -SWIPE_VELOCITY) next()
  else if (dx > width * SWIPE_DISTANCE || velocity > SWIPE_VELOCITY) prev()

  dragging.value = false
  dragOffset.value = 0

  // Swallow the click that follows a drag, so it doesn't play/pause a video
  justDragged = true
  setTimeout(() => (justDragged = false), 0)
}

function onClickCapture(e: MouseEvent) {
  if (justDragged) {
    e.preventDefault()
    e.stopPropagation()
  }
}

const trackStyle = computed(() => ({
  transform: `translateX(calc(${-index.value * 100}% + ${dragOffset.value}px))`,
  transition: dragging.value ? 'none' : undefined,
}))
</script>

<template>
  <div v-if="items.length" class="carousel">
    <div
      ref="viewport"
      class="viewport"
      :class="{ 'is-dragging': dragging }"
      tabindex="0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project media"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @click.capture="onClickCapture"
      @keydown.left.prevent="prev"
      @keydown.right.prevent="next"
    >
      <div class="track" :style="trackStyle">
        <div
          v-for="(item, i) in items"
          :key="item.src"
          class="slide"
          :aria-hidden="i !== index"
          :aria-label="`${i + 1} of ${items.length}: ${item.name}`"
        >
          <video
            v-if="item.type === 'video'"
            :ref="(el) => setVideoRef(i, el)"
            :src="item.url"
            controls
            playsinline
            preload="metadata"
          ></video>
          <img v-else :src="item.url" :alt="item.name" draggable="false" />
        </div>
      </div>
    </div>

    <p class="caption" aria-live="polite">{{ current?.name }}</p>

    <div class="dots" role="tablist" aria-label="Choose slide">
      <button
        v-for="(item, i) in items"
        :key="item.src"
        type="button"
        role="tab"
        class="dot"
        :class="{ 'is-active': i === index, 'is-video': item.type === 'video' }"
        :aria-selected="i === index"
        :aria-label="`${item.type === 'video' ? 'Video' : 'Image'}: ${item.name}`"
        @click="goTo(i)"
      >
        <!-- Videos get a play-triangle instead of a round dot -->
        <svg v-if="item.type === 'video'" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 1.2 L10.8 6 L2.5 10.8 Z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
}

.viewport {
  overflow: hidden;
  border-radius: 14px;
  background: #000;
  cursor: grab;
  touch-action: pan-y; /* vertical swipes still scroll the page */
  user-select: none;
}

.viewport.is-dragging {
  cursor: grabbing;
}

.viewport:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.track {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide {
  flex: 0 0 100%;
  aspect-ratio: 16 / 9;
}

.slide img,
.slide video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.caption {
  margin-top: 0.75rem;
  text-align: center;
  font-weight: 600;
  color: var(--color-text);
}

/* ---------- Dots ---------- */
.dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.dot {
  --dot-colour: var(--color-dot);
  display: grid;
  place-items: center;
  width: 12px;
  height: 12px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--dot-colour);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.dot:hover {
  transform: scale(1.2);
}

.dot.is-active {
  --dot-colour: var(--color-accent);
  transform: scale(1.35);
}

.dot:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

/* Video dot: just the triangle, in the dot colour */
.dot.is-video {
  width: 14px;
  height: 14px;
  border-radius: 0;
  background: none;
}

.dot.is-video svg {
  width: 100%;
  height: 100%;
  fill: var(--dot-colour);
  transition: fill 0.2s ease;
}
</style>
