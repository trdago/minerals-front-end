<template>
  <div>



 

  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'CotizacionesVencerView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  },
  components: {
  }
  ,data(){
    return {
      toastCount: 0,
    }
  }
}
</script>
