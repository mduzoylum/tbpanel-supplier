// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr : false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxtjs/i18n"],

  i18n: {
    vueI18n: './i18n.config.ts'
  },

  compatibilityDate: '2024-07-09'
})