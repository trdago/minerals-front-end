<template>
  <div>
    <table-component></table-component>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import TableComponent from '../../components/TableCotizacionesPorVencer.vue'
export default {
  name: 'CotizacionListPorVencerView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  },
  components: {
    TableComponent
  }
  ,data(){
    return {
      toastCount: 0,
    }
  }
}
</script>
