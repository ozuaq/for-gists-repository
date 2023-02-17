// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import mpa from 'vite-plugin-mpa'
import htmlTemplate from 'vite-plugin-html-template'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    mpa(),
    // undefined || {} || options below
    htmlTemplate({
      pages: {
        "support-info": {
          title: "support-info"
        },
        
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
  base: '/static/vue-dist/',
  build: {
    outDir: '../static/vue-dist',
  }
})
