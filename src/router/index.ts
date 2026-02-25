/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/test',
      component: Index,
    },
    {
      path: '/NCKU_database',
      component: () => import('@/pages/ncku_database.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/404.vue')
    }
  ],
})

export default router
