import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView'
import CotizacionesView from '../views/cotizaciones/Index'
import ConstruccionView from '../views/Construccion'
import auth from './../middleware/auth.js'
import logout from './../middleware/logout.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: logout,
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter: auth,

  },
  {
    path: '/unautorized',
    name: 'Unautorized',
    component: HomeView
  },
  {
    path: '/quotations/index/quotation_validity/active',
    name: 'cotizaciones',
    component: CotizacionesView,
    beforeEnter: auth,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '*/*',
    name: 'construccion',
    component: ConstruccionView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
