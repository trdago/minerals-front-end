
import axios from 'axios'
import route from '../../router'
const state = {
    isAuth: false,
    user: null,
    token: null,
    menu: [{
        text: 'Cotizaciones',
        icon: 'calendar4',
        menu: [

            {
                text: 'Listar Cotizaciones',
                url: '/quotations/index/quotation_validity/active'

            },
            {
                text: 'Nueva Cotización',
                url: '/quotations/add'

            },
            {
                text: 'Cotizaciones por Aprobar',
                url: '/quotations/pendingquotations'

            },
            {
                text: 'Cotizaciones por Vencer',
                url: '/quotations/por_vencer'

            }
        ]
    }
    ,{
        text: 'Ingreso',
        icon: 'truck',
        menu: [
            {
                text: 'Nueva Requisición',
                url: '/requisitions/search_client_quotation'
            }
            ,{
                text: 'Listar Requisiciones',
                url: '/requisitions'
            }
            ,{
                text: 'Nuevo Ingreso',
                url: '/entries/add'
            }
            ,{  divider: 'divider' }
            ,{
                text: 'Listar Ingresos',
                url: '/entries'
            }
            ,{
                text: 'Listar Ingresos Rechazados',
                url: '/entries/index_reject'
            }
            ,{
                text: 'Aprobar Ingresos',
                url: '/entries/approve_entries'
            }
        ]
    }
    ,{
        text: 'Trabajos',
        icon: 'hourglass-bottom',
        menu: [
            {
                text: 'Lista de OT',
                url: '/requisitions/index_ots'
            }
            ,{
                text: 'Lista de HT',
                url: '/worksheets'
            }
            ,{
                text: 'Lista de Resultados Aprobados',
                url: '/requisitions/approved_results_list'
            }
            ,{  divider: 'divider' }
            ,{
                text: 'Asignar Trabajos',
                url: '/assay_worksheets'
            }
            ,{
                text: 'Asignar Trabajos Nueva',
                url: '/works/asignacion_masiva'
            }
            ,{
                text: 'Trabajadores',
                url: '/works'
            }
            ,{
                text: 'Mis trabajos',
                url: '/works/mis_trabajos'
            }
            ,{  divider: 'divider' }
            ,{
                text: 'Controles de calidad',
                url: '/sample_values/index_quality_controls'
            }
            ,{
                text: 'Aprobaciones de datos',
                url: '/approvals/lista'
            }

        ]
    }
    ,{
        text: 'Pagos',
        icon: 'chash',
        menu: [
            {
                text: 'Lista de Estado de Pago',
                url: '/invoices'
            }
            ,{
                text: 'Nuevo Estado de Pago',
                url: '/invoices/nueva'
            }
        ]
    }
    ,{
        text: 'Bodega',
        icon: 'table',
        menu: [
            {
                text: 'Lista de Muestras',
                url: '/masterSamples/index_warehouse'
            }
            ,{
                text: 'Lista de OTs',
                url: '/requisitions/index_warehouse'
            }
            ,{
                text: 'Lista de Cajas',
                url: '/boxes'
            }
            ,{
                text: 'Lista de Bines',
                url: '/bins'
            }
            ,{ divider: 'divider'}
            ,{
                text: 'Nueva Caja',
                url: '/boxes/client_select'
            }
            ,{
                text: 'Nuevo Bin',
                url: '/bins/add'
            }
            ,{ divider: 'divider'}
            ,{
                text: 'Solicitudes Pendientes',
                url: '/requests'
            }
            ,{
                text: 'Solicitar Muestra',
                url: '/masterSamples/index_warehouse_request'
            }
            ,{
                text: 'Solicitar OT',
                url: '/requisitions/index_warehouse_request'
            }
        ]
    }
    ,{
        text: 'Mi Perfil',
        icon: 'person-fill',
        menu: [
            {
                text: 'Ver mis datos',
                url: '/users/viewmyprofile'
            }
            ,{
                text: 'Editar mis datos',
                url: '/users/editmyprofile'
            }
            ,{
                text: 'Cambiar contraseña',
                url: '/users/changemypassword'
            }
            ,{
                text: 'Salir',
                url: '/users/logout'
            }
        ]
    }
    ,{
        text: '',
        icon: 'gear-fill',
        menu: [
            {
                text: 'Ver mis datos',
                url: '/users/viewmyprofile'
            }
            ,{
                text: 'Editar mis datos',
                url: '/users/editmyprofile'
            }
            ,{
                text: 'Cambiar contraseña',
                url: '/users/changemypassword'
            }
            ,{
                text: 'Salir',
                url: '/users/logout'
            }
        ]
    }
],
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
    token: state => state.token
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
            data.menu =  [{
                text: 'Cotizaciones',
                icon: 'calendar4',
                menu: [
    
                    {
                        text: 'Listar Cotizaciones',
                        url: '/quotations/index/quotation_validity/active'
    
                    },
                    {
                        text: 'Nueva Cotización',
                        url: '/quotations/add'
    
                    },
                    {
                        text: 'Cotizaciones por Aprobar',
                        url: '/quotations/pendingquotations'
    
                    },
                    {
                        text: 'Cotizaciones por Vencer',
                        url: '/quotations/por_vencer'
    
                    }
                ]
            }
            ,{
                text: 'Ingreso',
                icon: 'truck',
                menu: [
                    {
                        text: 'Nueva Requisición',
                        url: '/requisitions/search_client_quotation'
                    }
                    ,{
                        text: 'Listar Requisiciones',
                        url: '/requisitions'
                    }
                    ,{
                        text: 'Nuevo Ingreso',
                        url: '/entries/add'
                    }
                    ,{  divider: 'divider' }
                    ,{
                        text: 'Listar Ingresos',
                        url: '/entries'
                    }
                    ,{
                        text: 'Listar Ingresos Rechazados',
                        url: '/entries/index_reject'
                    }
                    ,{
                        text: 'Aprobar Ingresos',
                        url: '/entries/approve_entries'
                    }
                ]
            }
            ,{
                text: 'Trabajos',
                icon: 'hourglass-bottom',
                menu: [
                    {
                        text: 'Lista de OT',
                        url: '/requisitions/index_ots'
                    }
                    ,{
                        text: 'Lista de HT',
                        url: '/worksheets'
                    }
                    ,{
                        text: 'Lista de Resultados Aprobados',
                        url: '/requisitions/approved_results_list'
                    }
                    ,{  divider: 'divider' }
                    ,{
                        text: 'Asignar Trabajos',
                        url: '/assay_worksheets'
                    }
                    ,{
                        text: 'Asignar Trabajos Nueva',
                        url: '/works/asignacion_masiva'
                    }
                    ,{
                        text: 'Trabajadores',
                        url: '/works'
                    }
                    ,{
                        text: 'Mis trabajos',
                        url: '/works/mis_trabajos'
                    }
                    ,{  divider: 'divider' }
                    ,{
                        text: 'Controles de calidad',
                        url: '/sample_values/index_quality_controls'
                    }
                    ,{
                        text: 'Aprobaciones de datos',
                        url: '/approvals/lista'
                    }
    
                ]
            }
            ,{
                text: 'Pagos',
                icon: 'chash',
                menu: [
                    {
                        text: 'Lista de Estado de Pago',
                        url: '/invoices'
                    }
                    ,{
                        text: 'Nuevo Estado de Pago',
                        url: '/invoices/nueva'
                    }
                ]
            }
            ,{
                text: 'Bodega',
                icon: 'table',
                menu: [
                    {
                        text: 'Lista de Muestras',
                        url: '/masterSamples/index_warehouse'
                    }
                    ,{
                        text: 'Lista de OTs',
                        url: '/requisitions/index_warehouse'
                    }
                    ,{
                        text: 'Lista de Cajas',
                        url: '/boxes'
                    }
                    ,{
                        text: 'Lista de Bines',
                        url: '/bins'
                    }
                    ,{ divider: 'divider'}
                    ,{
                        text: 'Nueva Caja',
                        url: '/boxes/client_select'
                    }
                    ,{
                        text: 'Nuevo Bin',
                        url: '/bins/add'
                    }
                    ,{ divider: 'divider'}
                    ,{
                        text: 'Solicitudes Pendientes',
                        url: '/requests'
                    }
                    ,{
                        text: 'Solicitar Muestra',
                        url: '/masterSamples/index_warehouse_request'
                    }
                    ,{
                        text: 'Solicitar OT',
                        url: '/requisitions/index_warehouse_request'
                    }
                ]
            }
            ,{
                text: 'Mi Perfil',
                icon: 'person-fill',
                menu: [
                    {
                        text: 'Ver mis datos',
                        url: '/users/viewmyprofile'
                    }
                    ,{
                        text: 'Editar mis datos',
                        url: '/users/editmyprofile'
                    }
                    ,{
                        text: 'Cambiar contraseña',
                        url: '/users/changemypassword'
                    }
                    ,{
                        text: 'Salir',
                        url: '/users/logout'
                    }
                ]
            }
            ,{
                text: '',
                icon: 'gear-fill',
                menu: [
                    {
                        text: 'Ver mis datos',
                        url: '/users/viewmyprofile'
                    }
                    ,{
                        text: 'Editar mis datos',
                        url: '/users/editmyprofile'
                    }
                    ,{
                        text: 'Cambiar contraseña',
                        url: '/users/changemypassword'
                    }
                    ,{
                        text: 'Salir',
                        url: '/users/logout'
                    }
                ]
            }
        ]


            payload.toast.success("Bienvenido")
            state.commit('SET_LOGIN', data)   
            await route.push({name: 'home'})
            state.commit('SET_AUTH', true) 
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