<script setup lang="ts">
import ProjectGrid from '@/components/ProjectGrid.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactLinks from '@/components/ContactLinks.vue'
import ContactForm from '@/components/ContactForm.vue'
</script>

<template>
  <section id="projects" class="section">
    <h2>Projects</h2>
    <ProjectGrid />
  </section>

  <section id="about" class="section">
    <h2>About Me</h2>
    <AboutSection />
  </section>

  <section id="contact" class="section">
    <h2>Contact</h2>
    <ContactLinks />
    <ContactForm />
  </section>
</template>

<style scoped>
.section {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 4rem 1.5rem;
  min-height: 60vh;
  /* keeps the heading clear of the sticky navbar when jumped to */
  scroll-margin-top: var(--navbar-height);
}

.section + .section {
  border-top: 1px solid var(--color-border);
}

h2 {
  font-size: 2rem;
  color: var(--color-accent-darker);
}
</style>
