// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  ssr:true,
  //needed for SGA/SPA for deployment on github pages
  nitro:{
    // preset: 'static',
    // needed for .nojekyll rule (github jekyll skips _folders in paths)
    preset: 'static',

    prerender:{
      crawlLinks: true,
      
    }
  },
  
  app:{
    // baseURL: `${process.env.NUXT_APP_BASE_URL}` || '/',
    baseURL: process.env.NODE_ENV === 'production' ? `/${process.env.REPO_NAME}/` : '/',
  },
  

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon'],

  // Needed to bundle used icons when prerendering
  // alternatively use provider and serverBundle
  icon:{
    clientBundle: {scan:true},

  },

  runtimeConfig: {
    public: {
      // cipher_animation_time: process.env.CIPHER_ANIMATION_TIME,

    }
  },


  
  // routeRules: {
  //   /* ─────────────── top-level pages ─────────────── */
  //   '/':                 { prerender: true },
  //   '/about':            { prerender: true },

  //   /* ─────────────── resources ─────────────── */
  //   '/resources':        { prerender: true },

  //   /* ─────────────── articles ─────────────── */
  //   '/articles':         { prerender: true },   // /pages/articles/index.vue
  //   '/articles/**':      { prerender: true },   // /pages/articles/[id].vue

  //   /* ─────────────── authors ─────────────── */
  //   '/authors/**':       { prerender: true },   // /pages/authors/[author].vue

  //   /* ─────────────── events ─────────────── */
  //   '/events':           { prerender: true },   // /pages/events/index.vue
  //   '/events/**':        { prerender: true },   // /pages/events/[id].vue

  //   /* ─────────────── news ─────────────── */
  //   '/news':             { prerender: true },   // /pages/news/index.vue
  //   '/news/**':          { prerender: true },   // /pages/news/[id].vue
  // },
  vite: {
    define: {
      global: 'globalThis'
    }
  },
  css:['/assets/scss/main.scss'],

  
})