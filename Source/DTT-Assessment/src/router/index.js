import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoriteView.vue')
    },
    {
      path: '/listings',
      name: 'listings',
      component: () => import('../views/ListingsView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      onError: (err) => console.log(err),
      component: () => import('../views/EditView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue')
    }
  ]
})

export default router
