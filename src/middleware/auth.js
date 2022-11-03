export default function auth(to, from, next) 
{
  /* 
    if (!localStorage.getItem('jwt')) {
      return router.push({ name: 'login' });
    }
  */

    console.log('Paso por el midleware', to, from)
  
    return next()
}