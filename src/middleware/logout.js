
import store from './../store/index'

export default async function auth(to, from, next) 
{ 


    //await store.getters['usuario/token']

    await store.dispatch('usuario/clearSession')

    console.log('hacer logout', to, from)


  
    return next()
}