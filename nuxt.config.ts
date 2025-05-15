// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  ssr:true,
  //needed for SGA/SPA for deployment on github pages
  nitro:{
    preset: 'static',
  },
  
  app:{
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REPO_NAME : '/',
  },
  

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon'],
  runtimeConfig: {
    public: {
      // cipher_animation_time: process.env.CIPHER_ANIMATION_TIME,

    }
  },
  vite: {
    define: {
      global: 'globalThis'
    }
  },
  css:['/assets/scss/main.scss'],

  
})