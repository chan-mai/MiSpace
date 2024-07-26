// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  dev: true,

  devtools: {
    enabled: true
  },

  css: [
    '~/assets/css/base.css'
  ],

  plugins: [
    "~/plugins/preline.client.ts"
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
})
