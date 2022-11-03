import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView'
import CotizacionesView from '../views/cotizaciones/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/unautorized',
    name: 'Unautorized',
    component: HomeView
  },
  {
    path: '/quotations/index/quotation_validity/active',
    name: 'cotizaciones',
    component: CotizacionesView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
