import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import TimerListView from '@/views/TimerListView.vue'
import TimerDetailView from '@/views/TimerDetailView.vue'
import SigninView from '@/views/SigninView.vue'
import SignupView from '@/views/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/timer',
      name: 'timer-list',
      component: TimerListView,
    },
    {
      path: '/timer/:id',
      name: 'timer-detail',
      component: TimerDetailView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
  ],
})

export default router
