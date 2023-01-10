import axios from 'axios'
import router from './router' 
import store from './store/index'

axios.defaults.baseURL = process.env.VUE_APP_API_BACKEND

axios.interceptors.request.use(async function(config) {


    config['headers']['Content-Type'] = `application/json`
    config['headers']['Accept'] = 'application/json; charset=utf-8'


    if(config['headers']['login']=='')
    {
     
        return config
    }

    let auth_token = store.getters['usuario/token']

    if(auth_token)
    {
        config['headers']["Authorization"] = `${auth_token}` 

    }
 
    return config

}, function(err) {   
    return Promise.reject(err) 
});

axios.interceptors.response.use(
    function (response) 
    { 
        console.log('response:: ', response)
        
        if(response.data?.statusCode == 403) 
            return router.push({path: '/unauthorized'}) 
        
        if(response.data.statusCode == 401)
            return router.push({path: '/unauthorized'}) 

        if (response.status === 200 || response.status === 201) 
        return Promise.resolve(response)
        

       
        return Promise.reject(response)
    },
    function (error) 
    {   

        if (error.request?.status !== 401) 
            return new Promise((resolve, reject) => reject(error))

        if ([401, 403].indexOf(error.request.status) !== -1) 
        {
            router.push({path: '/logout'})
        }

        return Promise.reject(error)
    }
  );

