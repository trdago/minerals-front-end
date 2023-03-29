<template>
  <div>
    <table-por-aprobar-component></table-por-aprobar-component>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import TablePorAprobarComponent from '../../components/TablePorAprobar.vue'

export default {
  name: 'CotizacionesAprobarView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  },
  components: {
    TablePorAprobarComponent
  }
  ,data(){
    return {
      toastCount: 0,
    }
  }
}
</script>
