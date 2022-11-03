<template>
<div>
  
    <b-row>
    <b-col sm="12">
        <b-row> 
                <b-col sm="2" class="my-3 pf-0 text-start">
                <b-form-group
                label="por página"
                label-for="per-page-select"
                label-cols-sm="7" 
                label-align-sm="right"
                label-size="sm"
                class="mb-0 pl-0"
                >
                <model-select 
                    id="per-page-select"
                    :options="pageOptions"
                    size="sm"
                    v-model="perPage"
                    placeholder="select item">
                </model-select> 
                </b-form-group>
            </b-col>
            <b-col sm="10" class=" my-4 text-end">
                 <b-button @click="search()" variant="pdarwin">
                     <b-icon icon="search"></b-icon>
                     Buscar
                     </b-button>

            </b-col>
        </b-row> 

    </b-col>
        </b-row>
        <b-row>
                <b-table
    :items="items"
    :fields="fields"
    :per-page="perPage"
    :filter="filter"
    :filter-included-fields="filterOn"
    stacked="md"
    :busy="isBusy"
    show-empty
    small
    :outlined="true"
    :bordered="true"
    > 

              <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">  
                <!-- {{ field.key }} -->
                            <!-- @change="changeRegion()" -->
                    <b-input-group v-if="field.is_select == 'interno_plazo' && field.fil">
                            <!-- :isDisabled="field.active" -->
                        <model-select 
                            size="sm"  
                            :options="internos"
                            v-model="filters[field.key]"
                            placeholder="interno_plazo">
                        </model-select>  
                    </b-input-group>
                
                    <b-input-group v-if="field.is_select == 'cotizacion' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="comunas"
                            v-model="filters[field.key]"
                            placeholder="creador">
                        </model-select>  
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'cliente' && field.fil">
                        <b-form-input  
                            @keyup.enter="enter_Filter(field, filters[field.key], true)"  
                            size="sm" 
                            :disabled="field.active" 
                            v-model="filters[field.key]">
                        </b-form-input>
                        <b-input-group-append> 
                        <b-button 
                            size="sm" 
                            v-if="!field.active" 
                            @click="enter_Filter(field, filters[field.key], true)" 
                            variant="pdarwin">
                            <b-icon icon="search"></b-icon>
                        </b-button>
                        <b-button 
                            size="sm" 
                            v-if="field.active"
                             @click="enter_Filter_Clear(field, filters[field.key])" 
                             variant="danger">
                            <b-icon icon="x"></b-icon>
                        </b-button>
                        </b-input-group-append>
                    </b-input-group>

                    <b-input-group v-if="field.is_select == 'estado' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="estados"
                            v-model="filters[field.key]"
                            placeholder="Estado">
                        </model-select>  
                    </b-input-group>

                    <b-input-group v-if="field.is_select == 'vigencia' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="vigencias"
                            v-model="filters[field.key]"
                            placeholder="Vigencia">
                        </model-select>  
                    </b-input-group>

                    <b-input-group v-if="field.is_select == 'expiracion' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="activas"
                            v-model="filters[field.key]"
                            placeholder="Activa">
                        </model-select>  
                    </b-input-group>
                   
                </td>
            </template>

             <template #cell(adjunto)="row">  
                     <b-button @click="downloadAdjunto(row)" v-if="row.item.is_adjunto"  variant="link"  title="Adjunto">
                        <b-icon  font-scale="2" icon="cloud-download-fill" aria-hidden="true"></b-icon>
                    </b-button>  

                     <b-button disabled v-if="!row.item.is_adjunto"  variant="link"  title="Adjunto">
                        <b-icon font-scale="2" icon="cloud" aria-hidden="true"></b-icon>
                    </b-button> 
             </template>

             <template #cell(detalle)="row">
                <b-button variant="primary" size="sm" @click="row.toggleDetails" class="mr-2">
                        <b-icon  icon="eye" aria-hidden="true"></b-icon>
                 
                </b-button>
             </template>

            <template #row-details="row">
                <b-card> 

                    <b-row>
                        <b-col sm="2">Teléfono</b-col>
                        <b-col>: {{ row.item.telefono }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col  sm="2">Comentario</b-col>
                        <b-col>: {{ row.item.descripcion }} </b-col>
                    </b-row>
                    
                    <b-row>
                        <b-col sm="3"></b-col>
                        <b-col class="text-right"><small>{{ row.item.created_at }}</small></b-col>
                    </b-row>
 
                </b-card>
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
        </b-row>

</div>
</template>


<style scoped>

   .cl_100 {
        width: 180px !important;
    }

</style>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import { ModelSelect } from 'vue-search-select'

export default {
  name: 'TableComponent',

   computed:{
    ...mapState('usuario', ['isAuth', 'user'])
  },
  methods: {
        ...mapActions('cotizaciones', ['searchFilter']),
        async search()
        {

            console.log('search filters::...', this.filters)

            /*  
              "active":"2",// 0=INACTIVOS, 1=ACTIVOS 2=TODOS
                "tipo":"filtros", 
                "offset":0,
                "limit":20, 
                "cliente":"ASMIN",
                "state_id":2,
                "quotation_state_id":5,
                "creador":null

            */

           console.log('filters:: ', this.filters)

            const payload = {}

            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.tipo = 'filtros'
            payload.limit = 20
            payload.offset = 0
            payload.active = 2
            payload.cliente= "ASMIN"
            payload.state_id= 2            
            payload.quotation_state_id= 5     
            payload.todas = "no"      
            //payload.cliente = this.filters['cliente']

            await this.searchFilter(payload)



        }
  },
  data: function(){
      return {
          cliente: null,
          activas:[
              { value: 2, text: 'Todas'},
              { value: 0, text: 'NO'},
              { value: 1, text: 'Si'},
          ],
          estados:[
              { value: 'all', text: 'Todos los estados'},
              { value: 'pendiente', text: 'Pendiente'},
              { value: 'aprobada', text: 'Aprobada'},
              { value: 'rechazada', text: 'rechazada'},
              { value: 'anulado', text: 'Anulado'},
          ],
          vigencias:[
              { value: 'all', text: 'Todas las vigencias'},
              { value: 'si', text: 'Vigencia'},
              { value: 'no', text: 'No vigencia'},
          ],
          internos:[
              { value: 'all', text: 'Todos los estados'},
              { value: 'ganada', text: 'Ganada'},
              { value: 'perdido', text: 'perdida'},
              { value: 'por_adjudicar', text: 'Por adjudicar'},
              { value: 'negociacion', text: 'Negociación'},
              { value: 'pendiente', text: 'Pendiente'},
          ],

        regiones: [],
        comunas: [],
        filters: {
            id: '',
            issuedBy: '',
            issuedTo: ''
        }, 
        loading : false, 
        isBusy: false,
        fields: [
            {  is_select: 'interno_plazo', active: false, fil: true, key: 'interno_plazo', label: 'Interno Plazo', class: 'text-center' },
            {  is_select: 'cotizacion', thClass:'cl_100', active: false, fil: true, key: 'cotizacion', label: 'Cotizacion'},
            {  is_select: 'cliente', active: false, fil: true, key: 'cliente', label: 'Cliente' },
            {  is_select: false, active: false, fil: true, key: 'proyecto', label: 'Proyecto'  },
            {  is_select: false, active: false, fil: false, key: 'inicio', label: 'Inicio'  },
            {  is_select: 'expiracion', active: false, fil: true,  key: 'expiracion', label:'Expiracion'},
            {  is_select: 'vigencia', active: false, fil: true, key: 'vigencia',  label:'Vigencia'},
            {  is_select: 'estado', active: false, fil: true, key: 'estado',  label:'Estado'},
            {  is_select: false, active: false, fil: false, key: 'acciones',  label:'Acciones'}
        ],
        items: [ ],
        totalRows: 0,
        currentPage: 1,
        perPage: 5,
        pageOptions: [
            {value: 5, text: '5'},
            {value: 10, text: '10'},
            {value: 20, text: '20'},
            {value: 50, text: '50'},
        ],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
         
        }
  },
  components: {
      ModelSelect

  }
}
</script>
