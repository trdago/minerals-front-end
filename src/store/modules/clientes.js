
import axios from 'axios'
const state = {
    clientes: [], 
    proyectos: []
}

const mutations = { 

    SET_CLIENTES(state, payload)
    {
        state.clientes = payload
    },
    SET_PROYECTOS(state, payload)
    {
        console.log('COLO PROYECTOS', payload)
        state.proyectos = payload || []
    }

}

const actions = {

    async getClientes({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los clientes'}

            

            await commit('SET_CLIENTES', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error No se logro consultar por los clientes")
            loading.hide()
            console.error('Error No se logro consultar por los clientes: ', error) 
        }
    
    },
    async validaCliente({commit}, payload) 
    {   
        console.log('valida cliente', payload)
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/herramientas/comprobar', payload)

            if(!data.ok) throw { message: 'No se logro  validar el cliente'}

            
            payload.toast.success(`Cliente ${ data.data[0].name } existe en el sistema`)
            loading.hide()


            await commit('SET_PROYECTOS', data.data[0].proyectos)

            return data.data[0]

        } catch (error) {
            payload.toast.error("Error No se logro validar el cliente")
            loading.hide()
            console.error('Error No se logro validar el cliente: ', error) 
        }
    
    },
    async crearCliente(state, payload) 
    {   
        console.log('crear cliente', payload)
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/accion', payload)

            if(!data.ok) throw { message: 'No se logro crear el cliente'}

            
            payload.toast.success(`Cliente ${ data.data[0].name } existe en el sistema`)
            loading.hide()
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error No se logro crear el cliente")
            loading.hide()
            console.error('Error No se logro crear el cliente: ', error) 
        }
    
    }
}

const getters= { 
    clientesFormat: state => {

        if(!state.clientes) return []

        return state.clientes.map(item => ({ value: item.id, text: item.name }))
    },
    proyectosFormat: state => {

        if(!state.proyectos) return []

        return state.proyectos.map(item => ({ value: item.id, text: item.proyecto }))
    }
}



export default {
    namespaced: true,
    getters, 
    state,
    mutations,
    actions
}