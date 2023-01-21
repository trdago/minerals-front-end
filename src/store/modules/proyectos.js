
import axios from 'axios'
const state = {
    proyectos: [], 
}

const mutations = { 

    SET_PROYECTOS(state, payload)
    {
        state.proyectos = payload
    }

}

const actions = {

    async getProyectos({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los proyectos'}

            

            await commit('SET_PROYECTOS', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error No se logro consultar por los clientes")
            loading.hide()
            console.error('Error No se logro consultar por los clientes: ', error) 
        }
    
    },
    async crearProyecto(state, payload) 
    {   
        console.log('valida cliente', payload)
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/herramientas/comprobar', payload)

            if(!data.ok) throw { message: 'No se logro  crear proyeto'}

         
            loading.hide()
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error No se logro crear el proyecto")
            loading.hide()
            console.error('Error No se logro crear el proyecto: ', error) 
        }
    
    }
}

const getters= { 
    proyectosFormat: state => {

        if(!state.proyectos) return []

        return state.proyectos.map(item => ({ value: item.id, text: item.name }))
    }
}



export default {
    namespaced: true,
    getters, 
    state,
    mutations,
    actions
}