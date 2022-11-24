
const state = {
    file: null,
    class_btn: 'btn btn-secondary',
    text_btn: 'Adjuntar escrito'
}

const mutations = { 

    SETFILE(state, payload) { state.file = payload }, 
    SETCLASSBTN(state, payload) { state.class_btn = payload }, 
    SETTEXTBTN(state, payload) { state.text_btn = payload },

}

const actions = {

    async deleteFile(state)
        {
            try {
                state.commit('SETCLASSBTN', 'btn btn-secondary text-btn')
                state.commit('SETTEXTBTN', 'Adjuntar escrito')
                state.commit('SETFILE', null)
            } catch (error) { throw {  message: 'Error al elminiar archivo', error  } }
        },

    async agregarFile(state, payload)
    {
        try {  
            // 5120 5 mb
            if(payload.sizeKB > 5120)
            {
                throw { message: "El archivo supera los 5 mb"}

            }
            
            state.commit('SETFILE', payload)
            state.commit('SETCLASSBTN', 'btn btn-primary text-btn')
            state.commit('SETTEXTBTN', payload.name)
        } catch (error) { 
             throw {  message: 'Error al asignar el archivo', error  } 
            
        
        }
    },
}



export default {
    namespaced: true, 
    state,
    mutations,
    actions
}