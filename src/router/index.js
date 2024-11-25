import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import SigninView from '@/views/SigninView.vue'
import SignupView from '@/views/SignupView.vue'
import TimerListView from '@/views/TimerListView.vue'
import TimerDetailView from '@/views/TimerDetailView.vue'
import CommunityListView from '@/views/CommunityListView.vue'
import { useHistoryStore } from '@/stores/history';
import { useUserStore } from '@/stores/user'

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
      meta : {requireAuth : true},
    },
    {
      path: '/timer/:id',
      name: 'timer-detail',
      component: TimerDetailView,
      meta : {requireAuth : true},
    },
    {
      path: '/community',
      name: 'community-list',
      component: CommunityListView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const historyStore = useHistoryStore();
  historyStore.setPrevUrl(from.fullPath);

  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated; // 로그인 여부 확인 (토큰이 있는지 등)

  // 인증이 필요한 페이지에 접근하려는 경우
  if (to.meta.requireAuth && !isAuthenticated) {
    // 로그인 페이지로 리디렉션
    next({ name: 'signin' });
  } else {
    next(); // 인증이 필요하지 않거나, 로그인 상태인 경우 이동
  }
});

export default router
