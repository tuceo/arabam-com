import DetailView from '@/views/DetailView.vue'
import ListingView from '@/views/ListingView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listing',
      component: ListingView,
    },
    {
      path: '/detay/:id',
      name: 'detail',
      component: DetailView,
    },
  ],
})

export default router
