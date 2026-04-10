import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import ShowDetails from '@/views/ShowDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/show-details/:id', component: ShowDetails },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
