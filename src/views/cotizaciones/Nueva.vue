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
   
      </b-card>
      <b-card 
        class="mt-1"
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Servicios seleccionado en estado temporal"
        header-tag="header"> 

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
              <b-form-group 
              label-size="sm"
              description="tipo de tecnica"
              label="Tipo de tecnica"
              label-for="input-1">
              <basic-select
                  :selectedOption="form.servicio"
                  @select="changeServicio"
                  size="sm"  
                  :options="serviciosFormat"
                  placeholder="tipos de servicios">
              </basic-select> 

             </b-form-group>

             
               
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <b-button @click="agregarServicios" link primary size="sm">Agregar servicios de una cotizacion existente</b-button>
          </b-col>
        </b-row>

        <b-table
                class="mt-1"
                striped="striped"
                :items="servicios"
                :fields="fields"
                :per-page="porPagina"
                :filter="filter"
                :filter-included-fields="filterOn"
                stacked="md"
                :busy="isBusy"
                show-empty
                small
                :outlined="true"
                :bordered="true"
                > 
 
     
             <template #cell(company_name)="row">   
                 <span class="text-darwin">
                           {{ row.item.company_name }}
                 </span>
             </template> 
       
       
 
            <template #empty>
                <div class="text-center my-2"> 
                    No se encontraron resultados
                </div>
            </template>

             <template #table-busy>
                <div class="text-center my-2"> 
                <b-spinner variant="primary" label="Spinning"></b-spinner> 
                </div>
            </template>
        </b-table>
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
import Swal from "sweetalert2"

export default {
  name: 'CotizacionesNewDosView',
  computed:{
    ...mapState('cotizaciones', ['cotiza', 'servicios']),
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
       await this.getServicios(
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

    },
    async changeServicio(item)
    {
      this.form.servicio.value = item.value 
      this.form.servicio.text = item.text

    },
    async agregarServicios()
    {
      console.log('Servicios:: ')

      await this.getCotizaciones(
       {
          loading: this.$loading,
          toast : this.$toast,
          company_id: this.cotiza.company_id || 0 ,
          project_id: this.cotiza.project_id || 0,
          active : "1",
          tipo : "tecnica",
          offset :0,
          limit :20
       }) 
      const { value } = await Swal.fire({ text: 'Agregar nuevo proyecto', 
                        input: 'text',
                        inputAttributes: {
                          placeholder: 'Nombre del proyecto',
                          autocapitalize: 'off'
                        },
                        type: 'success', 
                        confirmButtonText: 'Aceptar',
                        showCancelButton: false
                    })

    if(!value) return console.error('no se coloco nombre')


    console.log('Paso:: ');

    }

  }
  ,data(){
    return { 

      loading : false, 
        isBusy: false,
        fields: [
            {  is_select: 'quotation_state', active: false, fil: true, key: 'quotation_state', label: 'Valor USD$', class: 'text-center' },
            {  is_select: 'quotation_number', active: false, fil: true, key: 'quotation_number', label: 'Acciones', class: 'text-center'},
            {  is_select: 'company_name', active: false, fil: true, key: 'company_name', label: 'Nombre', class: 'text-center'},
            {  is_select: 'company_name', active: false, fil: true, key: 'project', label: 'Detalle' , class: 'text-center'}
        ],
      form: { 
        tipo_ensayo: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_muestra: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_digestion: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_tecnica: { text: null, value: null, isError: false, error: null, class: "select-default" },
        servicio: { text: null, value: null, isError: false, error: null, class: "select-default" },

      }
     
    }
  }
}
</script>
