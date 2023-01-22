
import axios from 'axios'
const state = {
    monedas: []
}

const mutations = { 

    SET_MONEDAS(state, payload)
    {
        state.monedas = payload
        console.log('seteadaslas monedas:: ', state.monedas)
    }

}

const actions = {

    async getAllMonedas({commit}, payload) 
    {   

        console.log('monedas buscar payload::', payload)
        let loading = payload.loading.show()

        try {

           const { data } = await axios.post('/api/herramientas/gettool', payload)

           console.log('MONEDAS::', data.data)

           if(!data.ok) throw { message: 'No se logro obtener las monedas'}

            
            
            await commit('SET_MONEDAS', data.data)

            loading.hide()
        } catch (error) {
            console.error('Error al buscar los tipos de  monedas:: ', error) 
            payload.toast.error("Error al buscar las monedas")
            loading.hide()
        } 
    }
}


const getters= { 
    monedasFormat: state => {

        if(!state.monedas) return []

        return state.monedas.map(item => ({ value: item.id, text: item.prefix }))
    }
}



export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters
}