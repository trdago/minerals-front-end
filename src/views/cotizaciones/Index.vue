<template>
  <div>

    <b-container class="h-75 d-inline-block" fluid >
      <b-container>
      <b-row class="mt-4">
        <b-col sm="6">

          <h2>
           <b-icon icon="calendar4"></b-icon> COTIZACIONES
          </h2>
        </b-col>
        <b-col sm="6">
            
          <b-list-group horizontal>
              <b-list-group-item class="text-small text-center" :to="{name: 'cotizaciones'}" active><small>Lista de Cotizaciones</small></b-list-group-item>
              <b-list-group-item class="text-small text-center"  href="#" ><small>Nueva Cotización</small></b-list-group-item>
              <b-list-group-item class="text-small text-center"  href="#"><small>Aprobar Cotización</small></b-list-group-item>
              <b-list-group-item class="text-small text-center"  href="#foobar"><small>Cotizaciones por Vencer</small></b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
         <span class="h1">Lista de Cotizaciones</span>
        </b-col>
        <b-col class="text-end">
          <b-button variant="link">
            <b-icon icon="printer"></b-icon>
          </b-button>
          <b-button variant="pdarwincafe">
            <b-icon icon="arrow-left"></b-icon>
            Volver
          </b-button>
        </b-col>
      
        <hr>
      </b-row>
      <b-row>
        <table-component></table-component>

      </b-row>

      </b-container>


  

    
    </b-container>


  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import TableComponent from './../../components/Table.vue'
export default {
  name: 'CotizacionesView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  },
  components: {
    TableComponent
  }
  ,data(){
    return {
      toastCount: 0
    }
  }
}
</script>
