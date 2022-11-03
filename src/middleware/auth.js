import store from './../store/index'


export default async function auth(to, from, next) 
{ 

    if(await store.getters['usuario/isAuth'])
    {

        return next()
    }

    return next({name: 'logout'}) 

  
}