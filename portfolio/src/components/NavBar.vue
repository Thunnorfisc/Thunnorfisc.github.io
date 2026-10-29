<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavIcon from './NavIcon.vue'
import ThemeToggle from './ThemeToggle.vue'
import logo from '@/assets/Portfolio Logo.png'
import projectIcon from '@/assets/project.svg?raw'
import aboutIcon from '@/assets/about.svg?raw'
import contactIcon from '@/assets/contact.svg?raw'

const links = [
  { label: 'Projects', hash: '#projects', icon: projectIcon },
  { label: 'About Me', hash: '#about', icon: aboutIcon },
  { label: 'Contact', hash: '#contact', icon: contactIcon },
]

// How far (px) the page has to scroll before the navbar collapses into one row.
const SCROLL_THRESHOLD = 40

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > SCROLL_THRESHOLD
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="navbar" :class="{ 'is-scrolled': scrolled }">
    <div class="navbar-inner">
      <RouterLink to="/" class="brand">
        <img :src="logo" alt="" class="brand-logo" />
        <span class="brand-name">Will's Chamber</span>
      </RouterLink>

      <nav>
        <ul class="nav-links">
          <li v-for="link in links" :key="link.hash">
            <RouterLink :to="{ path: '/', hash: link.hash }" class="nav-link">
              <NavIcon :svg="link.icon" class="nav-link-icon" />
              <span>{{ link.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <ThemeToggle class="navbar-theme-toggle" />
    </div>
  </header>

  <!-- The navbar is fixed, so this reserves its space at the top of the page. -->
  <div class="navbar-spacer" aria-hidden="true"></div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--navbar-height-expanded);
  background: var(--color-bg);
  transition:
    height 0.3s ease,
    box-shadow 0.3s ease;
}

.navbar-spacer {
  height: var(--navbar-height-expanded);
  flex-shrink: 0;
}

/* ---------- Expanded (top of page): everything centred, links under the brand ---------- */
.navbar-inner {
  position: relative;
  max-width: var(--content-width);
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 52px;
  height: 52px;
  object-fit: contain;
  transition:
    width 0.3s ease,
    height 0.3s ease;
}

/* Brand name grows a bit while centred; its font lives in brand.css */
.brand-name {
  font-size: 2.75rem;
  transition: font-size 0.3s ease;
}

/* ---------- Scrolled: brand on the left, links on the right ---------- */
.navbar.is-scrolled {
  height: var(--navbar-height);
  box-shadow: 0 1px 6px var(--color-shadow);
}

.is-scrolled .navbar-inner {
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
}

.is-scrolled .brand-logo {
  width: 38px;
  height: 38px;
}

.is-scrolled .brand-name {
  font-size: 2.1rem;
}

/* ---------- Theme toggle ---------- */
/* Expanded: tucked into the top-right corner */
.navbar-theme-toggle {
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
}

/* Scrolled: sits in the row, right after the links */
.is-scrolled .navbar-theme-toggle {
  position: static;
  transform: none;
}

.is-scrolled nav {
  margin-left: auto;
}

/* ---------- Links ---------- */
.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 2.25rem;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
  transition: color 0.15s;
}

.nav-link-icon {
  color: var(--color-accent);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 3px;
  border-radius: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-link:hover::after,
.nav-link:focus-visible::after {
  transform: scaleX(1);
}

@media (max-width: 640px) {
  .navbar-theme-toggle {
    top: 0.75rem;
    right: 0.75rem;
    transform: none;
  }

  .nav-links {
    gap: 1.25rem;
  }

  /* Icons only on small screens */
  .nav-link span {
    display: none;
  }

  .nav-link {
    font-size: 1.4rem;
  }

  .brand-name {
    font-size: 2.1rem;
  }

  .is-scrolled .brand-name {
    font-size: 1.6rem;
  }
}
</style>
