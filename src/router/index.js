import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import ShowDetails from '@/views/ShowDetails.vue';
import SearchPage from '@/views/SearchPage.vue';
import PageNotFound from '@/views/PageNotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/show-details/:id', component: ShowDetails },
  { path: '/search/:searchText?', component: SearchPage },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
