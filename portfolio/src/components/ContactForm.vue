<script setup lang="ts">
import { reactive, ref } from 'vue'
import contactData from '@/contact/contact.json'

/*
 * Sends through FormSubmit (https://formsubmit.co) — a free service that forwards
 * form submissions to an email address, so this static site needs no backend.
 * The very first submission sends an activation email to the address below;
 * click the link in it once and every message after that is delivered.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${contactData.formRecipient}`

const form = reactive({ name: '', email: '', message: '' })
const honeypot = ref('') // hidden field: bots fill it in, people don't
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function submit() {
  if (honeypot.value) return
  status.value = 'sending'

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        _subject: `Portfolio message from ${form.name}`,
        _replyto: form.email,
        _template: 'table',
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean }
    if (!res.ok || String(data.success) === 'false') throw new Error('Send failed')

    status.value = 'sent'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="contact-form-wrap">
    <h3 class="form-heading">Email Me</h3>

    <form class="contact-form" @submit.prevent="submit">
      <div class="field-row">
        <label class="field">
          <span class="field-label">Name</span>
          <span class="frame"><input v-model.trim="form.name" type="text" name="name" autocomplete="name" required /></span>
        </label>

        <label class="field">
          <span class="field-label">Email</span>
          <span class="frame"><input v-model.trim="form.email" type="email" name="email" autocomplete="email" required /></span>
        </label>
      </div>

      <label class="field">
        <span class="field-label">Message</span>
        <span class="frame"><textarea v-model="form.message" name="message" rows="6" required></textarea></span>
      </label>

      <!-- Honeypot: hidden from people, catches spam bots -->
      <input
        v-model="honeypot"
        type="text"
        name="_honey"
        class="honeypot"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <div class="form-footer">
        <button type="submit" class="send-btn" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Sending…' : 'Send Message' }}
          <span class="chevron" aria-hidden="true">›</span>
        </button>

        <p v-if="status === 'sent'" class="form-status is-success" role="status">
          Thanks! Your message has been sent.
        </p>
        <p v-else-if="status === 'error'" class="form-status is-error" role="alert">
          Something went wrong. Please try again, or email me directly at
          <a :href="`mailto:${contactData.formRecipient}`">{{ contactData.formRecipient }}</a>.
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.contact-form-wrap {
  max-width: 720px;
  margin: 3.5rem auto 0;
}

.form-heading {
  font-size: 1.6rem;
  text-align: center;
  color: var(--color-accent-darker);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin-top: 1.5rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field-label {
  font-weight: 700;
  color: var(--color-heading);
}

/* ---------- Text boxes: Valorant-style double frame ---------- */
.frame {
  --frame-colour: var(--color-frame);
  --frame-outer: var(--color-frame-outer);
  --frame-width: 1.5px;
  position: relative;
  display: block;
  margin: 6px; /* room for the outer frame */
}

/* Outer thin frame — with a gap in the middle of the left and right sides */
.frame::before {
  content: '';
  position: absolute;
  inset: -6px;
  border: 1px solid var(--frame-outer);
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, #000 30%, transparent 30% 70%, #000 70%);
  mask-image: linear-gradient(to bottom, #000 30%, transparent 30% 70%, #000 70%);
  transition: border-color 0.15s;
}

/* Inner border — corners clipped off at the top-left and bottom-right */
.frame::after {
  content: '';
  position: absolute;
  inset: 0;
  border: var(--frame-width) solid var(--frame-colour);
  pointer-events: none;
  -webkit-mask-image: linear-gradient(
    135deg,
    transparent 7px,
    #000 7px calc(100% - 7px),
    transparent calc(100% - 7px)
  );
  mask-image: linear-gradient(
    135deg,
    transparent 7px,
    #000 7px calc(100% - 7px),
    transparent calc(100% - 7px)
  );
  transition:
    border-color 0.15s,
    border-width 0.15s;
}

.frame input,
.frame textarea {
  display: block;
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 3px solid transparent; /* the visible border is drawn by .frame::after */
  border-radius: 0;
  background: var(--color-bg);
  font: inherit;
  color: var(--color-text);
}

.frame textarea {
  resize: vertical;
  min-height: 8rem;
}

.frame input:focus,
.frame textarea:focus {
  outline: none;
}

/* Hovering a box you're not typing in: light red */
.frame:hover:not(:focus-within) {
  --frame-colour: var(--color-frame-hover);
  --frame-outer: var(--color-frame-hover-outer);
}

/* Typing in it: red and thicker */
.frame:focus-within {
  --frame-colour: var(--color-accent);
  --frame-outer: var(--color-accent);
  --frame-width: 3px;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.form-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.4rem;
}

.send-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.6rem;
  border: 2px solid var(--color-accent);
  border-radius: 999px;
  background: var(--color-accent);
  font: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition:
    background-color 0.15s,
    border-color 0.15s,
    transform 0.1s;
}

.send-btn:hover:not(:disabled) {
  background: var(--color-accent-strong-bg);
  border-color: var(--color-accent-strong-bg);
}

.send-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

.send-btn .chevron {
  font-size: 1.3em;
  line-height: 1;
}

.form-status {
  text-align: center;
  font-weight: 600;
}

.form-status.is-success {
  color: var(--color-success);
}

.form-status.is-error {
  color: var(--color-accent);
}

.form-status a {
  text-decoration: underline;
}

@media (max-width: 560px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>
