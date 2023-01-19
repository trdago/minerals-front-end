
import axios from 'axios'
const state = {
    clientes: [], 
}

const mutations = { 

    SET_CLIENTES(state, payload)
    {
        state.clientes = payload.data 
    }

}

const actions = {

    async getClientes({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar las cotizaciones'}
            

            await commit('SET_CLIENTES', data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        }
     

    
    }
}



export default {
    namespaced: true, 
    state,
    mutations,
    actions
}