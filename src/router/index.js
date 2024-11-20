import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import SigninView from '@/views/SigninView.vue'
import SignupView from '@/views/SignupView.vue'
import TimerListView from '@/views/TimerListView.vue'
import TimerDetailView from '@/views/TimerDetailView.vue'
import CommunityListView from '@/views/CommunityListView.vue'
import { useHistoryStore } from '@/stores/history';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
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
      path: '/community',
      name: 'community-list',
      component: CommunityListView,
    },
  ],
})

router.beforeEach((to, from) => {
  const store = useHistoryStore();
  store.setPrevUrl(from.fullPath);
})

export default router
