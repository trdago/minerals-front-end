import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import usuario from './modules/usuario'
import cotizaciones from './modules/cotizaciones'
import clientes from './modules/clientes'
import monedas from './modules/monedas'
import icp from './modules/icp'
import proyectos from './modules/proyectos'
import destinatarios from './modules/destinatarios'


const modules = {
  usuario,
  cotizaciones,
  monedas,
  icp,
  clientes,
  proyectos,
  destinatarios
}
Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({path:'usuario'})],
})
