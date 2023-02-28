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
                    <b-input-group v-if="field.is_select == 'quotation_state' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="internos"
                            v-model="filters[field.key]"
                            placeholder="interno_plazo">
                        </model-select>  
                    </b-input-group>
                
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

                    <b-input-group v-if="field.is_select == 'active' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="vigencias"
                            v-model="filters[field.key]"
                            placeholder="Vigencia">
                        </model-select>  
                    </b-input-group>

                    <b-input-group v-if="field.is_select == 'expiration_date' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="activas"
                            v-model="filters[field.key]"
                            placeholder="Activa">
                        </model-select>  
                    </b-input-group>
                   
                </td>
            </template>

             <template #cell(quotation_state)="row">  
                   <b-badge v-if="row.item.quotation_state == 'Pendiente'" class="bg-secondary" variant="info">{{ row.item.quotation_state }}</b-badge>  
                   <b-badge v-if="row.item.quotation_state == 'Por adjudicar'" class="bg-primary" variant="info">{{ row.item.quotation_state }}</b-badge>  
                   <b-badge v-if="row.item.quotation_state == 'Ganada'" class="bg-success" variant="info">{{ row.item.quotation_state }}</b-badge>  
                   <b-badge v-if="row.item.quotation_state == 'Perdida'" class="bg-danger" variant="info">{{ row.item.quotation_state }}</b-badge>  
                   <b-badge v-if="row.item.quotation_state == 'Negociación'" class="bg-warning" variant="info">{{ row.item.quotation_state }}</b-badge>  
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
             <template #cell(project)="row">   
                 <span class="text-darwin">
                           {{ row.item.project }}
                 </span>
             </template>
             <template #cell(start_date)="row">   
                 <span class="text-darwin">
                           {{ row.item.start_date }}
                 </span>
             </template>
             <template #cell(expiration_date)="row">   
                 <span class="text-darwin">
                           {{ row.item.expiration_date }}
                 </span>
             </template>
             <template #cell(active)="row">   
                   <b-badge v-if="row.item.active == 0" class="bg-danger" >No Vigente</b-badge>  
                   <b-badge v-if="row.item.active == 1" class="bg-success" >Vigente</b-badge>  
               
             </template>
             <template #cell(state_id)="row">   
                   <b-badge v-if="row.item.state_id == 1" class="bg-warning">Pendiente</b-badge>  
                   <b-badge v-if="row.item.state_id == 2" class="bg-success">Aprobada</b-badge>  
                   <b-badge v-if="row.item.state_id == 3" class="bg-danger">Rechazada</b-badge>  
                   <b-badge v-if="row.item.state_id == 4" class="bg-seondary">Anulada</b-badge>  
               
             </template>
             <template #cell(acciones)="row">   
                <b-button-group size="sm">
                    <b-button >ver</b-button>
                    <b-dropdown size="sm" variant="secondary">
                    <template #button-content>
                        <span class="sr-only">Opciones</span>
                    </template> 
                    <b-dropdown-item  href="">Nueva versión</b-dropdown-item>
                    <b-dropdown-item  href="">Ver historial</b-dropdown-item>
                    <b-dropdown-item  @click="descargarPDF(row.item)">Descargar PDF</b-dropdown-item> 
                    <b-dropdown-item  @click="descargarDOC(row.item)">Descargar WORD</b-dropdown-item> 
                    <b-dropdown-item  href="">Anular</b-dropdown-item> 
                    <b-dropdown-item  href="">Editar estado interno</b-dropdown-item> 
                    <b-dropdown-item  href="">Adjuntar</b-dropdown-item> 

                    </b-dropdown>
                </b-button-group>
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
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import { ModelSelect } from 'vue-search-select'
import { downloadPDFBase64 } from './../util/pdfHelper'

export default {
    name: 'TableComponent',
    computed:{
    ...mapState('cotizaciones', [
        'totalRows',  
        'cotizaciones', 
        'pageOptions'
        ])
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
    mounted()
    {
        this.filters['active'] = 2
    },
    methods: {
        ...mapActions('cotizaciones', ['searchFilter', 'download']),

        async descargarPDF(item)
        {
            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.active = 1
            payload.id = item.id
            payload.download = 'pdf' 

            const data =  await this.download(payload)  
 
            await downloadPDFBase64([
            {
                documento: data, 
                contentType: 'application/pdf',
                nombre: `${ item.id }.pdf`
            }]) 
        },
        async descargarDOC(item)
        {
            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.active = 1
            payload.id = item.id
            payload.download = 'word' 

            const data =  await this.download(payload)  
 
            await downloadPDFBase64([
            {
                documento: data, 
                contentType: 'application/msword',
                nombre: `${ item.id }.doc`
            }]) 
        },
        async search()
        { 
            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.tipo = 'filtros'
            payload.limit = this.porPagina
            payload.offset =  this.porPagina * (this.currentPage - 1)
            payload.cliente= this.filters['company_name']
            payload.quotation_state_id= this.filters['quotation_state']
            payload.state_id= this.filters['state_id']
            // payload.creador=  this.filters['quotation_number']
            payload.active =String(this.filters['active'])  

            if(this.filters['quotation_number'])
                payload.quotation_number =String(this.filters['quotation_number'])  
            
            payload.todas = "no"     
            
            console.log('pay:: ', payload)
            //payload.cliente = this.filters['cliente']

            await this.searchFilter(payload)
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
            {  is_select: 'quotation_state', active: false, fil: true, key: 'quotation_state', label: 'Interno Plazo', class: 'text-center' },
            {  is_select: 'quotation_number', active: false, fil: true, key: 'quotation_number', label: 'Cotizacion', class: 'text-center'},
            {  is_select: 'company_name', active: false, fil: true, key: 'company_name', label: 'Cliente', class: 'text-center'},
            {  is_select: false, active: false, fil: true, key: 'project', label: 'Proyecto' , class: 'text-center'},
            {  is_select: false, active: false, fil: false, key: 'start_date', label: 'Inicio' , class: 'text-center'},
            {  is_select: 'expiration_date', active: false, fil: true,  key: 'expiration_date', label:'Expiracion', class: 'text-center'},
            {  is_select: 'active', active: false, fil: true, key: 'active',  label:'Vigencia', class: 'text-center'},
            {  is_select: 'state_id', active: false, fil: true, key: 'state_id',  label:'Estado', class: 'text-center'},
            {  is_select: false, active: false, fil: false, key: 'acciones',  label:'Acciones', class: 'text-center'}
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
