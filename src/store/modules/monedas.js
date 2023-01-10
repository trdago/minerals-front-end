
import axios from 'axios'
const state = {
    monedas: []
}

const mutations = { 

    SET_MONEDAS(state, payload)
    {
        state.monedas = payload.data
    }

}

const actions = {

    async getAllMonedas({commit}, payload) 
    {   

        try {
            console.log('payload::', payload)

            const { data } =  await axios.post('/api/gettool', payload)

            console.log('data:: ', data)
            if(!data.ok) throw { message: 'No se logro consultar por las monedas'}
            
            await commit('SET_MONEDAS', data)

            payload.loading.hide()
        } catch (error) {
            console.error('Error al buscar los tipos de  monedas:: ', error) 
            payload.toast.error("Error al buscar las monedas")
            payload.loading.hide()
        }
     

    
    }
}



export default {
    namespaced: true, 
    state,
    mutations,
    actions
}