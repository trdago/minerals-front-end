import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import usuario from './modules/usuario'
import cotizaciones from './modules/cotizaciones'


const modules = {
  usuario,
  cotizaciones
}
Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({path:'usuario'})],
})
