import { fileURLToPath } from 'url';
import { join, dirname } from 'pathe';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [join(__dirname, 'assets/styles/quasar.sass')],
  build: {
    transpile: ['quasar']
  },
  modules: ['@pinia/nuxt']
});
