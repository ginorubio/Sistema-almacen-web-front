import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainLayout from '../layouts/MainLayout.vue'

import store from '../store'

const routes = [
  
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import( '../views/HomeView.vue'),
        meta: {rutaProtegida: true}
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {rutaProtegida: true}
      }
    ]

  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(item => item.meta.rutaProtegida)
  
  if(rutaProtegida && store.state.token === null){
    next('/login')
  }else{
    next()
  }

}) 

export default router
