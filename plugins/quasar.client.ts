import quasarLang from 'quasar/lang/pt-BR';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

import { Quasar, Notify } from 'quasar';

// @ts-ignore
export default defineNuxtPlugin(nuxtApp => {
  const quasarUserOptions = {
    lang: quasarLang,
    plugins: { Notify }
  };

  nuxtApp.vueApp.use(Quasar, quasarUserOptions);
  return {};
});
