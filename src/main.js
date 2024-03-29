import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './interceptor'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue' 

import Vue2Editor from "vue2-editor"

//import 'bootstrap/dist/css/bootstrap.css'
//import '@/assets/custom-vars.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/custom-vars.scss'

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'vue-search-select/dist/VueSearchSelect.css'
 
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format'
import Vuelidate from 'vuelidate'
 
Vue.use(VueFilterDateFormat)


Vue.use(require('vue-moment'))

Vue.config.productionTip = false  

 



Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(IconsPlugin)
Vue.use(VueLoading,{
  container: null,
  canCancel: false
})
Vue.use(Vue2Editor)

Vue.use(Vuelidate)


import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options =
   {
    position: "top-right",
    timeout: 6000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
  } 


Vue.use(Toast, options);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
