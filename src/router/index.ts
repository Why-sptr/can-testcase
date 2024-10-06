import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import GameListView from '../views/GameListView.vue';
import GameFavouriteView from '../views/GameFavoriteView.vue';
import GameDetailView from '../views/GameDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/games',
    name: 'GameList',
    component: GameListView,
  },
  {
    path: '/favorites',
    name: 'GameFavourite',
    component: GameFavouriteView,
  },
  {
    path: '/games/:id',
    name: 'GameDetail',
    component: GameDetailView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
