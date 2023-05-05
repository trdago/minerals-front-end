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
              <b-list-group-item 
                @click="seccion ='Lista de Cotizaciones'" 
                active-class="active"
                class="text-small text-center" 
                :to="{name: 'cotizaciones'}">
                  <small>Lista de Cotizaciones</small>
              </b-list-group-item>
              <b-list-group-item 
                @click="seccion='Nueva Cotización'" 
                active-class="active" 
                class="text-small text-center" 
                :to="{name: 'cotizaciones_new'}" >
                  <small>Nueva Cotización</small>
              </b-list-group-item>

              <b-list-group-item 
              active-class="active" 
              class="text-small text-center"  
              :to="{ name: 'cotizaciones_pendientes'}"
              @click="seccion='Aprobar Cotización'"
              ><small>Aprobar Cotización</small>
              
              </b-list-group-item>
              <b-list-group-item 
              active-class="active" 
              class="text-small text-center"
               @click="seccion='Cotizaciones por vencer'" 
              :to="{name: 'cotizaciones_por_vencer'}"
              ><small>Cotizaciones por Vencer</small></b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
         <span class="h1">{{ seccion }}</span>
        </b-col>
        <b-col class="text-end">
          <b-button variant="link">
            <b-icon icon="printer"></b-icon>
          </b-button>
          <b-button 
            @click="$router.go(-1)"
            variant="pdarwincafe">
            <b-icon icon="arrow-left"></b-icon>
            Volver
          </b-button>
        </b-col>
      
        <hr>
      </b-row>
      <b-row>
         <router-view/>

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
export default {
  name: 'CotizacionesView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  }
  ,data(){
    return {
      seccion: '',
    }
  }
}
</script>
