import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainLayout from '../layouts/MainLayout.vue'

import Product from '../components/Product.vue'
import Movement from '../components/Movement.vue'
import Category from '../components/Category.vue'
import UserManagement from '../components/UserManagement.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'


import store from '../store'

const routes = [
  
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { rutaProtegida: false},
    beforeEnter: (to, from, next) => {
      if(store.state.token){
        next({name: 'home'})
      }else{
        next()
      }
    }
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: { rutaProtegida: true }
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView,
        meta: { rutaProtegida: true }
      },
      {
        path: 'producto',
        name: 'producto',
        component: Product,
        meta: { rutaProtegida: true }
      },
      {
        path: 'categoria',
        name: 'categoria',
        component: Category,
        meta: { rutaProtegida: true }
      },
      {
        path: 'movimientos',
        name: 'movimientos',
        component: Movement,
        meta: { rutaProtegida: true }
      },
      {
        path: 'gestion-usuario',
        name: 'gestionUsuario',
        component: UserManagement,
        meta: { rutaProtegida: true }
      }
    ]
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found',
    beforeEnter: (to, from, next) => {
      if(store.state.token){
        next({name: 'home'})
      }else{
        next({name: 'login'})
      }
    }
  }
  
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

router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href


export default router
