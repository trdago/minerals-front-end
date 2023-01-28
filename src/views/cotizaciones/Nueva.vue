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

             <b-form-group 
              label-size="sm"
              description="tipo de ensayo"
              label="Tipo de ensayo"
              label-for="input-1">
            <basic-select
                  :selectedOption="form.tipo_ensayo"
                  @select="changeEnsayo"
                  size="sm"  
                  :options="ensayosFormat"
                  placeholder="tipos de ensayo">
              </basic-select> 
             </b-form-group>

          </b-col>
          <b-col>
              <b-form-group 
              label-size="sm"
              description="tipo de muestra"
              label="Tipo de muestra"
              label-for="input-1">
              <basic-select
                  :selectedOption="form.tipo_muestra"
                  @select="changeMuestra"
                  size="sm"  
                  :options="muestrasFormat"
                  placeholder="tipos de muestras">
              </basic-select> 
             </b-form-group>
             

          </b-col>
        </b-row>
        <b-row> 
          <b-col>
                <b-form-group 
              label-size="sm"
              description="tipo de digestion "
              label="Tipo de digestion"
              label-for="input-1">
              <basic-select
                  :selectedOption="form.tipo_digestion"
                  @select="changeDigestion"
                  size="sm"  
                  :options="digestionesFormat"
                  placeholder="tipos de digestiones">
              </basic-select> 
             </b-form-group>
            
            

          </b-col>
          <b-col>
                <b-form-group 
              label-size="sm"
              description="tipo de tecnica"
              label="Tipo de tecnica"
              label-for="input-1">
              <basic-select
                  :selectedOption="form.tipo_tecnica"
                  @select="changeTecnica"
                  size="sm"  
                  :options="tecnicasFormat"
                  placeholder="tipos de tecnicas">
              </basic-select> 

             </b-form-group>
               
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { BasicSelect } from 'vue-search-select'
export default {
  name: 'CotizacionesNewDosView',
  computed:{
    ...mapState('cotizaciones', ['cotiza']),
    ...mapGetters('cotizaciones', [ 'ensayosFormat', 'muestrasFormat', 'digestionesFormat', 'tecnicasFormat']), 
    ...mapState('clientes', ['cliente'])
  },
  components: {
    BasicSelect
  },
  async mounted()
  {
       this.getTipoEnsayo(
       {
          loading: this.$loading,
           toast : this.$toast,
          active : "1",
          tipo : "tipos_de_ensayo",
          offset :0,
          limit :20
       }) 
       this.getTipoMuestra(
       {
          loading: this.$loading,
           toast : this.$toast,
          active : "1",
          tipo : "tipo_muestra",
          offset :0,
          limit :20
       })
       this.getTipoDigestion(
       {
          loading: this.$loading,
           toast : this.$toast,
          active : "1",
          tipo : "digestiones",
          offset :0,
          limit :20
       })
       await this.getTipoTecnica(
       {
          loading: this.$loading,
           toast : this.$toast,
          active : "1",
          tipo : "tecnica",
          offset :0,
          limit :20
       }) 


  },
  methods:{
    ...mapActions('cotizaciones', ['getTipoEnsayo', 'getTipoMuestra', 'getTipoDigestion', 'getTipoTecnica']),

    async changeEnsayo(item)
    {
      this.form.tipo_ensayo.value = item.value 
      this.form.tipo_ensayo.text = item.text

    },
    async changeMuestra(item)
    {
      this.form.tipo_muestra.value = item.value 
      this.form.tipo_muestra.text = item.text

    },
    async changeDigestion(item)
    {
      this.form.tipo_digestion.value = item.value 
      this.form.tipo_digestion.text = item.text

    },
    async changeTecnica(item)
    {
      this.form.tipo_tecnica.value = item.value 
      this.form.tipo_tecnica.text = item.text

    }

  }
  ,data(){
    return { 
      form: { 
        tipo_ensayo: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_muestra: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_digestion: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_tecnica: { text: null, value: null, isError: false, error: null, class: "select-default" },

      }
     
    }
  }
}
</script>
