// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-07',
  devtools: { enabled: true },
  experimental: {
    watcher: "chokidar",
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  routeRules: {
    '/': { prerender: true }
  },
  typescript: {
    typeCheck: true
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
})