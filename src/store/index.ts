import { createPinia } from 'pinia';
import { App } from 'vue';
import router from '@/router';

const pinia = createPinia();

// * 扩展router
export function setupPinia(app: App) {
  pinia.use(({ store }) => {
    store.$router = router;
  });
  app.use(pinia);
}

export * from './use.store';
export * from './app.store';
