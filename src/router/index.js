import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView'
import ConstruccionView from '../views/Construccion'
import CotizacionListView from '../views/cotizaciones/List'
import CotizacionesView from '../views/cotizaciones/Index'
import CotizacionesNewView from '../views/cotizaciones/New'
import CotizacionesAprobarView from '../views/cotizaciones/Aprobar'
import CotizacionesVencerView from '../views/cotizaciones/Vencer'
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
    beforeEnter: logout
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
    path: '/quotations',
    beforeEnter: auth,
    component: CotizacionesView,
    children: [  
      {
        path: '/quotations/index/quotation_validity/active',
        name: 'cotizaciones',
        component: CotizacionListView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/add',
        name: 'cotizaciones_new',
        component: CotizacionesNewView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/pendingquotations',
        name: 'cotizaciones_new',
        component: CotizacionesAprobarView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/pendingquotations',
        name: 'cotizaciones_new',
        component: CotizacionesVencerView,
        beforeEnter: auth,
      },
    ]
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
