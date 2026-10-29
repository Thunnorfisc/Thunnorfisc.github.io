import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

// index.html sets data-theme before the page paints (no flash); start from that
const startTheme: Theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

/** The current theme. Dark is the default; the choice is remembered in this browser. */
export const theme = ref<Theme>(startTheme)

let transitionTimer: number | undefined

watch(theme, (value) => {
  const root = document.documentElement

  // Fade colours for a moment so the switch isn't a hard flash
  root.classList.add('theme-transition')
  window.clearTimeout(transitionTimer)
  transitionTimer = window.setTimeout(() => root.classList.remove('theme-transition'), 400)

  root.dataset.theme = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // storage blocked (private mode etc.) — the switch still works for this visit
  }
})

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
