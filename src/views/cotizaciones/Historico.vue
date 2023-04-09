<template>
  <div>
    <table-historico-component></table-historico-component>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src 
import TableHistoricoComponent from '../../components/TableHistorico.vue'
export default {
  name: 'CotizacionHistorico',
  computed:{ 
  },
  components: {
    TableHistoricoComponent
  }
  ,data(){
    return { 
    }
  }
}
</script>
