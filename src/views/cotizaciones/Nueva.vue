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

        <b-row>
          <b-col>
            <table class="table striped  table-bordered ">
              <tbody>
                <tr>
                  <td class="text-right">Rut</td> <td class="text-left">{{ cliente.rut }}-{{ cliente.dv }}</td> 
                </tr>
                <tr v-if="cotiza">
                     <td class="text-right">Cotización</td> <td class="text-left">{{ cotiza.quotation_number}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Nombre</td> <td class="text-left">{{ cliente.name}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Estado</td> <td class="text-left">
                     <span v-if="cliente.active==true">Activo</span> 
                     <span v-if="cliente.active==false">Inactivo</span> 
                    </td>
                  
                </tr>
                <tr>
                  <td class="text-right">Inicio</td> <td class="text-left">{{ new Date(cotiza.created) |   dateFormat('YYYY-MM-DD') }}</td> 
                </tr>
                <tr>
                  <td class="text-right">Expiración</td> <td class="text-left">{{ new Date(cotiza.expiration_date) |   dateFormat('YYYY-MM-DD') }}</td>
                </tr>
              </tbody>
            </table>
        
         
          </b-col> 
        </b-row> 
        <b-row> 
          <b-col>
            <basic-select
                  :selectedOption="form.tipo_ensayo"
                  @select="changeEnsayo"
                  size="sm"  
                  :options="tiposensayosFormat"
                  placeholder="tipos de ensayo">
              </basic-select> 

          </b-col>
          <b-col>

          </b-col>
        </b-row>
        <b-row> 
          <b-col>

          </b-col>
          <b-col>

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
import { mapState, mapActions } from 'vuex'
import { BasicSelect } from 'vue-search-select'
export default {
  name: 'CotizacionesNewDosView',
  computed:{
    ...mapState('cotizaciones', ['cotiza', 'tiposensayosFormat']),
    ...mapState('clientes', ['cliente'])
  },
  components: {
    BasicSelect
  },
  async mounted()
  {
       await this.getTipoEnsayo(
       {
          loading: this.$loading,
           toast : this.$toast,
          active : "1",
          tipo : "tipos_de_ensayo",
          offset :0,
          limit :20
       }) 


  },
  methods:{
    ...mapActions('cotizaciones', ['getTipoEnsayo']),

    async changeEnsayo(item)
    {
      this.form.tipo_ensayo.value = item.value 
      this.form.tipo_ensayo.text = item.text

    }

  }
  ,data(){
    return { 
      form: { 
        tipo_ensayo: { text: null, value: null, isError: false, error: null, class: "select-default" },

      }
     
    }
  }
}
</script>
