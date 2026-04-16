import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../features/home/HomeView.vue'
import Login from '@/features/auth/Login.vue'
import Main from '@/core/layout/Main.vue'
import Register from '@/features/auth/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/articles',
          name: 'articles',
          props: true,

          component: () => import('@/features/articles/Articles.vue'),
        },
        {
          path: '/article/:fid',
          name: 'article',
          props: true,

          component: () => import('@/features/articles/Article.vue'),
        },
      ],
    },
  ],
})

export default router
