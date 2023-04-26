
import axios from 'axios'
const state = {
   destinatarios: []
}

const mutations = { 

    SET_DESTINATARIOS(state, payload)
    {
        state.destinatarios = payload
    }

}

const actions = {

    async getDestinatarios({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/quotations/destinatarios', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los destinatarios'}
            

            await commit('SET_DESTINATARIOS', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los destinatarios")
            loading.hide()
            console.error('Error al buscar los destinatarios:: ', error) 
        } 
    },
    async crearDestinatario(state, payload) 
    {   
 
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/destinatario/crear', payload)

            if(!data.ok) throw { message: 'No se logro  crear destinatario'}

            payload.toast.success("Destinatario creado")

            loading.hide()
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error No se logro crear destinatario")
            loading.hide()
            console.error('Error No se logro crear destinatario: ', error) 
        }
    },
 
}

const getters= {  
    destinatariosFormat: state => {

        if(!state.destinatarios) return []

        console.log('destinatarios', state.destinatarios)

        return state.destinatarios.map(item => ({ value: item.id, text: `${ item.telefono || ''}-${ item.name || ''  }-${ item.mail || ''  }` }))
    }
}



export default {
    namespaced: true,
    getters, 
    state,
    mutations,
    actions
}