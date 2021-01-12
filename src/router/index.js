import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  { path: '/', name: 'Login', component: () => import("@/views/Home.vue") },
  { path: '/home', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/signing', name: 'Signing', component: () => import('@/views/Signing.vue') }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
