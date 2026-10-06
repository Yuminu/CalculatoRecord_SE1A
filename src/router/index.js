/**
 * Vue Router configuration.
 *
 * "/" renders the calculator home page and "/favorites" renders the
 * favorites list page.
 */
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import FavoritesPage from '../views/FavoritesPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
