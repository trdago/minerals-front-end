<template>
  <div>
      <b-card-group deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Datos de la cotización"
        header-tag="header"> 

         <b-row>
           <b-col>
             Datos de la Cotización
           </b-col>
         </b-row>

         cotiza:: {{ cotiza}}

        <b-row>
          <b-col>
            <table class="table striped  table-bordered ">
              <tbody>
                <tr>
                  <td class="text-right">Rut</td> <td class="text-left">2</td> 
                </tr>
                <tr v-if="cotiza">
                     <td class="text-right">Cotización</td> <td class="text-left">{{ cotiza.id}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Nombre</td> <td class="text-left">{{ cotiza.id}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Estado</td> <td class="text-left">2</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Inicio</td> <td class="text-left">2</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Expiración</td> <td class="text-left">2</td>
                </tr>
              </tbody>
            </table>
        
         
          </b-col> 
        </b-row> 
      </b-card>
    </b-card-group>
 
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'CotizacionesNewDosView',
  computed:{
    ...mapState('cotizaciones', ['cotiza'])
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
