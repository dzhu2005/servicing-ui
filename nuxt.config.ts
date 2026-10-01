// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/image', '@vueuse/nuxt', '@nuxt/icon', 'nuxt-zod','@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  },
  // Server-only (not under `public`). Override with NUXT_AWS_PROFILE,
  // NUXT_AWS_REGION, NUXT_AWS_SECRET_NAME.
  runtimeConfig: {
    aws: {
      profile: 'secman-los-dev',
      region: 'ca-central-1',
      secretName: 'secman-los-uat'
    }
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US' }
    ],
    defaultLocale: 'en'
  } 
})
