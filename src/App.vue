<template>
  <div>
    <Headers></Headers>
    <router-view/>
    <Footer></Footer>

  </div>
</template>

<script>
import Headers from './components/header.vue'
import Footer from './components/footer.vue'

export default {
  name: 'LoginView',
  components: {
      Headers,
      Footer
  }
  ,mounted()
  {
    
  }
  
  
}
</script>