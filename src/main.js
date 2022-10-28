import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './interceptor'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue'

//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import '@/assets/custom-vars.scss'
import '@/assets/custom-vars.scss'


Vue.config.productionTip = false


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
