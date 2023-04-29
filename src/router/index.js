import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView'
import ConstruccionView from '../views/Construccion'
import CotizacionListView from '../views/cotizaciones/List'
import CotizacionHistorico from '../views/cotizaciones/Historico'
import CotizacionesView from '../views/cotizaciones/Index'
import UploadView from '../views/icp/Upload'
import CotizacionesNewView from '../views/cotizaciones/New'
import CotizacionesNuevaVersionView from '../views/cotizaciones/NewVersion'
import CotizacionesNewDosView from '../views/cotizaciones/Nueva'
import CotizacionesAprobarView from '../views/cotizaciones/Aprobar'
import CotizacionListPorVencerView from '../views/cotizaciones/Vencer'
import CotizacionVerView from '../views/cotizaciones/Ver'
import CotizacionView from '../views/cotizaciones/View'
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

  },
  {
    path: '/unautorized',
    name: 'Unautorized',
    component: HomeView
  },
  {
    path: '/icp',
    component: UploadView,
    children: [
      {
        path: '/icp/upload',
        name: 'icp.upload',
        component: UploadView,
      },
    ]
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
        path: '/quotations/addfromparent/:id',
        name: 'cotizaciones_nueva_version',
        component: CotizacionesNuevaVersionView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/add/2',
        name: 'cotizaciones_new_dos',
        component: CotizacionesNewDosView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/pendingquotations',
        name: 'cotizaciones_pendientes',
        component: CotizacionesAprobarView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/por_vencer',
        name: 'cotizaciones_por_vencer',
        component: CotizacionListPorVencerView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/por_vencer',
        name: 'cotizaciones_ver',
        component: CotizacionVerView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/view/:id',
        name: 'cotizaciones_view',
        component: CotizacionView,
        beforeEnter: auth,
      },
      {
        path: '/quotations/historico/view/:id',
        name: 'cotizaciones_historico',
        component: CotizacionHistorico,
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
  { path: '/docs'  } 
    
  
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

console.log("reou;;;;;",router.base);


export default router
