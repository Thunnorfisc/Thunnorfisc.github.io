<script setup lang="ts">
import { getProjectFile } from '@/utils/projectAssets'
import contactData from '@/contact/contact.json'

// Logos come from src/projects/General and keep their original colours.
// If a logo file is missing, the title text is shown instead.
// "invertInDark": true flips black logos to white in dark mode.
const links = contactData.links.map((link) => ({
  ...link,
  logoUrl: getProjectFile('General', link.logo),
  external: /^https?:/i.test(link.url),
}))
</script>

<template>
  <!-- Logos sit right-aligned against the centre, links left-aligned from it,
       so each row reads outwards from the middle -->
  <dl class="contact-links">
    <div v-for="link in links" :key="link.title" class="contact-row">
      <dt class="contact-title">
        <img v-if="link.logoUrl" :src="link.logoUrl" :alt="link.title" :title="link.title" class="contact-logo" :class="{ 'is-invert': link.invertInDark }" />
        <span v-else>{{ link.title }}</span>
      </dt>
      <dd class="contact-value">
        <a
          :href="link.url"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener' : undefined"
          >{{ link.label }}</a
        >
      </dd>
    </div>
  </dl>
</template>

<style scoped>
.contact-links {
  margin-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.contact-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
  align-items: center;
  padding: 1.25rem 0.25rem;
  border-bottom: 1px solid var(--color-border);
}

.contact-title {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
}

.contact-logo {
  display: block;
  height: 2.25rem; /* logo size — width follows the logo's own shape */
  width: auto;
}

:root[data-theme='dark'] .contact-logo.is-invert {
  filter: invert(1);
}

.contact-value {
  justify-self: start;
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.contact-value a {
  font-weight: 700;
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.contact-value a:hover {
  color: var(--color-accent-darker);
}

/* Phones: stack title over value, centred */
@media (max-width: 560px) {
  .contact-row {
    grid-template-columns: 1fr;
    row-gap: 0.4rem;
    justify-items: center;
    text-align: center;
  }

  .contact-title,
  .contact-value {
    justify-self: center;
  }
}
</style>
