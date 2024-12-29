import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ProgrammerResume from '@/components/ProgrammerResume';


const constantRoutes = [
  {
    path: '/',
    name: 'ProgrammerResume',
    component: ProgrammerResume
  },
]

export default new VueRouter({
  mode: 'history', // 去掉url中的#
  base: "/", // 与publicPath保持一致
  routes: constantRoutes
});