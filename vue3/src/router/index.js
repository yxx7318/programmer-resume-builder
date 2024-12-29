import { createRouter, createWebHistory } from 'vue-router'
import ProgrammerResume from '@/components/ProgrammerResume.vue';

const routes = [
  {
    path: '/',
    name: 'ProgrammerResume',
    component: ProgrammerResume
  },
]

const router = createRouter({
  history: createWebHistory(
    '/', // 与publicPath保持一致
  ),
  routes
})

export default router