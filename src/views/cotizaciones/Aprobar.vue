<template>
  <div>

<TableComponentAprobar></TableComponentAprobar>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import TableComponentAprobar from '../../components/quotation/TablePorAprobar.vue'
export default {
  name: 'CotizacionesAprobarView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  },
  components: {
    TableComponentAprobar
  }
  ,data(){
    return {
      toastCount: 0,
    }
  }
}
</script>
