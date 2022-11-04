
import axios from 'axios'
const state = {
    cotizaciones: [],
    totalRows: 0,
    pageOptions: [
        {value: 5, text: '5'},
        {value: 10, text: '10'},
        {value: 20, text: '20'},
        {value: 50, text: '50'},
    ],
}

const mutations = { 

    SET_COTIZACIONES(state, payload)
    {
        state.totalRows = payload.total_registros
        state.cotizaciones = payload.data
    }

}

const actions = {

    async searchFilter({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/cotizacion/', payload)

            if(!data.ok) throw { message: 'No se logro consultar las cotizaciones'}
            

            await commit('SET_COTIZACIONES', data)

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