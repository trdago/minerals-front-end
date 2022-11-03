
import axios from 'axios'
const state = {
    cotizaciones: []
}

const mutations = { 

}

const actions = {

    async searchFilter(state, payload) 
    {   
        let loading = payload.loading.show()

        try {

           const { data } =  await axios.post('/api/cotizacion/')
            
           console.log('data:: ', data)
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