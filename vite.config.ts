import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import {nodePolyfills} from "vite-plugin-node-polyfills";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vueJsx(),
    nodePolyfills({
      include: ['buffer']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  }
})
