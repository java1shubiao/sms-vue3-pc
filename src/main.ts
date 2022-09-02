import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
import { setupPinia } from '@/store';
import './dynPublicPath';
// import { createPinia } from 'pinia';

const app = createApp(App);
setupPinia(app);

// const pinia = createPinia();
// // * store扩展使用router
// pinia.use(({ store }) => {
//   store.$router = router;
// });

app.use(router).mount('#app');
