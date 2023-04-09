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
                  v-model="porPagina"
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
              striped="striped"
              :items="cotizaciones"
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
              <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">   
                    <b-input-group v-if="field.is_select == 'quotation_number' && field.fil">
                        <b-form-input  
                            @keyup.enter="search()"  
                            size="sm" 
                            :disabled="field.active" 
                            v-model="filters[field.key]">
                        </b-form-input>
                        <b-input-group-append> 
                        <b-button 
                            size="sm" 
                            v-if="!field.active" 
                            @click="search()" 
                            variant="pdarwin">
                            <b-icon icon="search"></b-icon>
                        </b-button>
                        <b-button 
                            size="sm" 
                            v-if="field.active"
                             @click="search()" 
                             variant="danger">
                            <b-icon icon="x"></b-icon>
                        </b-button>
                        </b-input-group-append>
                    </b-input-group>

                    <b-input-group v-if="field.is_select == 'company_name' && field.fil">
                        <b-form-input  
                            @keyup.enter="search()"  
                            size="sm" 
                            :disabled="field.active" 
                            v-model="filters[field.key]">
                        </b-form-input>
                        <b-input-group-append> 
                        <b-button 
                            size="sm" 
                            v-if="!field.active" 
                            @click="search()" 
                            variant="pdarwin">
                            <b-icon icon="search"></b-icon>
                        </b-button>
                        <b-button 
                            size="sm" 
                            v-if="field.active"
                             @click="search()" 
                             variant="danger">
                            <b-icon icon="x"></b-icon>
                        </b-button>
                        </b-input-group-append>
                    </b-input-group>

                    <b-input-group v-if="field.is_select == 'state_id' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="estados"
                            v-model="filters[field.key]"
                            placeholder="Estado">
                        </model-select>  
                    </b-input-group>

                </td>
            </template>

           <template #cell(quotation_number)="row">  
               <b-row>
               <span> {{ row.item.quotation_number }}</span>
               </b-row>
               <b-row>
                 <b-badge class="text-darwin">
                     <small>
                         <b-icon icon="person-fill"></b-icon>
                         {{ row.item.user_creator }}
                         </small>
                     </b-badge>  

               </b-row>
               
           </template>

           <template #cell(company_name)="row">   
               <span class="text-darwin">
                         {{ row.item.company_name }}
               </span>
           </template>

           <template #cell(state_id)="row">   
                 <b-badge v-if="row.item.state_id == 1" class="bg-warning">Pendiente</b-badge>  
                 <b-badge v-if="row.item.state_id == 2" class="bg-success">Aprobada</b-badge>  
                 <b-badge v-if="row.item.state_id == 3" class="bg-danger">Rechazada</b-badge>  
                 <b-badge v-if="row.item.state_id == 4" class="bg-seondary">Anulada</b-badge>  
             
           </template>

           <template #cell(acciones)="row">   
                <div >
                    <b-button  @click="search(row.item.id)" size="sm" variant="outline-secondary">Ver</b-button>
                    <b-button  @click="accionQuo(row.item.id,'rechazar')" size="sm" variant="outline-warning">Rechazar</b-button>
                    <b-button  @click="accionQuo(row.item.id,'aprobar_venta')" size="sm" variant="outline-dark">Aprobar(Venta)</b-button>
                    <b-button  @click="accionQuo(row.item.id,'aprobar_produccion')" size="sm" variant="outline-dark">Aprobar(Producción)</b-button>
                </div>
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
      <b-row class="mb-4">
          <b-col cols="4">
              <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="porPagina"
              align="fill"
              size="sm"
              class="my-0"
              ></b-pagination>
          </b-col>
      </b-row>

</div>
</template>
<style scoped>

   .cl_100 {
        width: 180px !important;
    }

</style>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { ModelSelect } from 'vue-search-select'
export default {
    name: 'TableComponentAprobar',
    computed:{
    ...mapState('cotizaciones', ['totalRows','cotizaciones','pageOptions']),
    ...mapGetters('cotizaciones', ['cotizacioneshistoricasFormat'])
    },
    watch: {
        'porPagina' : async function()
        {  
            await this.search()
        },
        'currentPage' : async function()
        {  
            await this.search()
        },
    },
    async created(){
        console.log('cargar ......')
        await this.search()
    },
    methods: {
        ...mapActions('cotizaciones', ['porAprobar','quotationAction']),
        async search()
        {   
            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.limit = this.porPagina
            payload.offset =  this.porPagina * (this.currentPage - 1)  
            await this.porAprobar(payload)
        },
        async accionQuo(id, act ){
            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.id = id
            payload.accion = act
            await this.quotationAction(payload)
            await this.search();
            // console.log("data retutrn", tester1);
        },
        async ver(id){
            const payload = {}
            payload.id = id
            if(payload.comentario){
                await this.quotationAction(payload)
            }
            await this.quotationAction(payload)
        }
    },
    data: function(){
      return {
          currentPage:1,
          porPagina: 5,
          cliente: null,
          activas:[
              { value: 2, text: 'Todas'},
              { value: 0, text: 'NO'},
              { value: 1, text: 'Si'},
          ],
          estados:[
              { value: 0, text: 'Todos los estados'},
              { value: 1, text: 'Pendiente'},
              { value: 2, text: 'Aprobada'},
              { value: 3, text: 'Rechazada'},
              { value: 3, text: 'Anulado'},
          ],
          vigencias:[
              { value: 2, text: 'Todas las vigencias'},
              { value: 1, text: 'Vigencia'},
              { value: 0, text: 'No vigencia'},
          ],
          internos:[
              { value: 0, text: 'Todos los estados'},
              { value: 1, text: 'Ganada'},
              { value: 2, text: 'Perdida'},
              { value: 3, text: 'Por adjudicar'},
              { value: 4, text: 'Negociación'},
              { value: 5, text: 'Pendiente'},
          ],
        filters: {
            id: '',
            issuedBy: '',
            issuedTo: ''
        }, 
        loading : false, 
        isBusy: false,
        fields: [
            {  is_select: 'quotation_number', active: false, fil: true, key: 'quotation_number', label: 'Cotizacion', class: 'text-center'},
            {  is_select: 'company_name', active: false, fil: true, key: 'company_name', label: 'Cliente', class: 'text-center'},
            {  is_select: 'state_id', active: false, fil: true, key: 'state_id',  label:'Estado', class: 'text-center'},
            {  is_select: false, active: false, fil: false, key: 'acciones',  label:'Accion', class: 'text-center'}
        ],
        filter: null,
        filterOn: [],         
        }
    },
    components: {
      ModelSelect

    }
    }
</script>
