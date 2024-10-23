// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2024-10-07',
  experimental: {
    watcher: "chokidar",
  },
  
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
})