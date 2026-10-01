<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const isDev = import.meta.dev

// `statusCode` is deprecated in Nuxt 4 but still set by some callers.
const status = computed(() => props.error.status ?? props.error.statusCode ?? 500)
const isNotFound = computed(() => status.value === 404)
const isServerError = computed(() => status.value >= 500)

const title = computed(() => {
  if (isNotFound.value) return 'Page not found'
  if (isServerError.value) return 'Something went wrong'
  return props.error.statusText ?? props.error.statusMessage ?? 'Request failed'
})

// Server error messages can carry internals (SQL, hostnames, secrets), so only
// show them in dev. Client errors (4xx) are written for the user and are safe.
const description = computed(() => {
  if (isNotFound.value) {
    return 'The page you are looking for may have been moved, renamed, or never existed. Check the address or head back to the dashboard.'
  }
  if (isServerError.value && !isDev) {
    return 'We hit an unexpected problem on our side. Please try again in a moment. If it keeps happening, contact support.'
  }
  return props.error.message || 'An unexpected error occurred.'
})

const icon = computed(() => {
  if (isNotFound.value) return 'i-lucide-map-pin-off'
  if (isServerError.value) return 'i-lucide-server-crash'
  return 'i-lucide-circle-alert'
})

useHead({ title: () => `${status.value} · ${title.value}` })

const handleError = () => clearError({ redirect: '/' })
const retry = () => reloadNuxtApp()
</script>

<template>
  <UApp>
    <main class="font-body min-h-dvh flex items-center justify-center p-4">
      <section
        class="w-full max-w-md rounded-(--radius-xl) border border-(--color-hairline) bg-(--color-surface) p-8 text-center"
        aria-labelledby="error-title"
        aria-describedby="error-description"
      >
        <div
          class="mx-auto mb-6 flex size-16 items-center justify-center rounded-full"
          :class="isServerError ? 'bg-(--color-danger-soft) text-(--color-danger)' : 'bg-(--color-primary-soft) text-(--color-primary)'"
          aria-hidden="true"
        >
          <UIcon :name="icon" class="size-8" />
        </div>

        <p class="text-xs font-semibold tracking-widest uppercase text-(--color-ink-faint)">
          Error {{ status }}
        </p>
        <h1 id="error-title" class="mt-2 text-2xl font-semibold text-(--color-ink)">
          {{ title }}
        </h1>
        <p id="error-description" class="mt-3 text-sm leading-relaxed text-(--color-ink-muted)">
          {{ description }}
        </p>

        <div class="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <UButton
            v-if="isServerError"
            variant="ghost"
            color="neutral"
            icon="i-lucide-rotate-ccw"
            class="justify-center rounded-full px-4 text-[13px] font-semibold cursor-pointer"
            @click="retry"
          >
            Try again
          </UButton>
          <UButton
            icon="i-lucide-house"
            class="justify-center rounded-full px-4 text-[13px] font-semibold cursor-pointer"
            @click="handleError"
          >
            Back to home
          </UButton>
        </div>

        <details
          v-if="isDev && error.stack"
          class="mt-8 text-left text-xs text-(--color-ink-muted)"
        >
          <summary class="cursor-pointer font-semibold">Stack trace (dev only)</summary>
          <pre class="mt-2 max-h-64 overflow-auto rounded-(--radius-md) bg-(--color-canvas-soft) p-3 whitespace-pre-wrap">{{ error.stack }}</pre>
        </details>
      </section>
    </main>
  </UApp>
</template>
