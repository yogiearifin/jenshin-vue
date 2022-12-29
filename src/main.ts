import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@/style.css';
import App from '@/App.vue';

const MainPage = () => import('@/pages/Main/index.vue');
const Detail = () => import('@/pages/Detail/index.vue');
const Favorite = () => import('@/pages/Favorite/index.vue');
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', name: 'Home', component: MainPage,
    },
    {
      path: '/:character', name: 'Character Detail', component: Detail
    },
    {
      path: '/favorite', name: 'Favorite Characters', component: Favorite
    }
  ]
});

createApp(App).use(router).mount('#app');
