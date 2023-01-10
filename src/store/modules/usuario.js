
import axios from 'axios'
import route from '../../router'
const state = {
    isAuth: false,
    user: null,
    token: null,
    menu: []
,
    perfiles:[
        {id:"2", nombre: "administrador"},
        {id:"3", nombre: "observador"},
        {id:"4", nombre: "cliente"},
        {id:"5", nombre: "contacto cliente"},
        {id:"6", nombre: "ventas"},
        {id:"7", nombre: "recepción"},
        {id:"8", nombre: "jefe recepción"},
        {id:"9", nombre: "bodega"},
        {id:"10", nombre: "jefe laboratorio"},
        {id:"11", nombre: "técnico laboratorio"},
        {id:"12", nombre: "jefe ventas"},
        {id:"14", nombre: "datos"},
        {id:"16", nombre: "contabilidad"}
    ]
}

const getters = {
    token: state => state.token,
    isAuth: state => state.isAuth,
}

const mutations = { 
    SET_LOGIN(state, payload) 
    { 
        payload.user.perfil = state.perfiles.find(p => p.id == payload.user.group_id)
        state.user = payload.user 
        state.menu = payload.menu
        state.token = payload.token
    },
    SET_AUTH(state, payload)
    {
        state.isAuth = payload

        if(!payload)
        {
            state.user = null
            state.token = null
        }
        
    },
    CLEAR_SESSION(state)
    {

        state.user = null
        state.isAuth = false
    }

}

const actions = {

    async clearSession({commit}, payload)
    {

        console.log('limpiar session', payload)

        commit('CLEAR_SESSION')

    },

    async login(state, payload) 
    {   
        let loading = payload.loading.show()
        
        try {

            const { data } = await axios.post('auth/login', payload)

            if(!data.ok) throw { message: 'usuario o contraseña incorrecto'}
  


            payload.toast.success("Bienvenido")
            await state.commit('SET_LOGIN', data)   
            await state.commit('SET_AUTH', true) 
            await route.push({name: 'home'})
            loading.hide() 
            
            
        } catch (error) {
            payload.toast.error("Usuario o contraseña incorrecto")
            loading.hide()
            state.commit('SET_AUTH', false)   
            console.error('Error al hacer login:: ', error)
        }

    
    }
}



export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters
}