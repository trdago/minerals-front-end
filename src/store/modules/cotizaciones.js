import axios from 'axios'
const state = {
    cotizaciones: [],
    condiciones: [],
    cotiza: null,
    totalRows: 0,
    tipos_ensayos: [],
    tipos_muestras: [],
    tipos_digestiones: [],
    tipos_tecnicas: [],
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
    },

    SET_CONDICIONES(state, payload)
    {
        state.condiciones = payload.data
    },
    SET_COTIZACION(state, payload)
    {
        state.cotiza = payload
    },
    SET_TIPOS_ENSAYO(state, payload)
    {
        state.tipos_ensayos = payload
    },
    SET_TIPOS_MUESTRA(state, payload)
    {
        state.tipos_muestras = payload
    },
    SET_TIPOS_DIGESTION(state, payload)
    {
        state.tipos_digestiones = payload
    },
    SET_TIPOS_TECNICA(state, payload)
    {
        state.tipos_tecnicas = payload
    }

}

const actions = {

    async download(state, payload) 
    {   
        let loading = payload.loading.show()

        try {

            // todo

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        } 
    },
    async searchFilter({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/filter', payload)

            if(!data.ok) throw { message: 'No se logro consultar las cotizaciones'}
            

            await commit('SET_COTIZACIONES', data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        } 
    },
    async getTipoEnsayo({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los tipos de ensayos'}
            

            await commit('SET_TIPOS_ENSAYO', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los tipos de ensayos")
            loading.hide()
            console.error('Error al buscar los tipos de ensayos:: ', error) 
        } 
    },
    async getTipoMuestra({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los tipos de muestras'}
            

            await commit('SET_TIPOS_MUESTRA', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los tipos de muestras")
            loading.hide()
            console.error('Error al buscar los tipos de muestras:: ', error) 
        } 
    },
    async getTipoDigestion({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los tipos de digestion'}
            

            await commit('SET_TIPOS_DIGESTION', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los tipos de digestion")
            loading.hide()
            console.error('Error al buscar los tipos de diogestion:: ', error) 
        } 
    },
    async getTipoTecnica({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los tipos de tecnicas'}
            

            await commit('SET_TIPOS_TECNICA', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los tipos de tecnicas")
            loading.hide()
            console.error('Error al buscar los tipos de tecnicas:: ', error) 
        } 
    },
    async searchCondiciones({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar las condiciones'}
            

            await commit('SET_CONDICIONES', data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las condiciones")
            loading.hide()
            console.error('Error al buscar las condiciones:: ', error) 
        } 
    },
    async crearProyecto(state, payload) 
    {   
        console.log('crear proyecto', payload)
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/accion', payload)

            if(!data.ok) throw { message: 'No se logro  crear proyeto'}

            loading.hide()
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error No se logro crear el proyecto")
            loading.hide()
            console.error('Error No se logro crear el proyecto: ', error) 
        }
    },
    async crearCotizacion({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {
            const { data } =  await axios.post('/api/quotations/accion', payload)

            console.log(data)

            if(!data.ok) throw { message: 'No se creo cotizacion'} 

            loading.hide() 
            payload.toast.success("Cotizacion creada")
            console.log('NUEVA COTIZACION::::', data)
            await commit('SET_COTIZACION', data.data[0])
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error no se creo cotizacion")
            loading.hide()
            console.error('Error No  se crear cotizacion: ', error) 
        }
    
    }
}



const getters= { 
    condicionesFormat: state => {

        if(!state.condiciones) return []

        return state.condiciones.map(item => ({ value: item.id, text: item.title }))
    },
    ensayosFormat: state => {

        if(!state.tipos_ensayos) return []


        return state.tipos_ensayos.map(item => ({ value: item.id, text: item.name }))
    },
    muestrasFormat: state => {

        if(!state.tipos_muestras) return []


        return state.tipos_muestras.map(item => ({ value: item.id, text: item.name }))
    },
    digestionesFormat: state => {

        if(!state.tipos_digestiones) return []


        return state.tipos_digestiones.map(item => ({ value: item.id, text: item.name }))
    },
    tecnicasFormat: state => {

        if(!state.tipos_tecnicas) return []


        return state.tipos_tecnicas.map(item => ({ value: item.id, text: item.name }))
    }
}


export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters
}