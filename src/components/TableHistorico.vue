<template>
<div>
  
    <b-row>
    <b-col sm="12"> 
        <h1>
            Historial de cotización {{  cotiza?.quotation_number }}
        </h1>
    </b-col>
        </b-row>
        <b-row>
                <b-table
                striped="striped"
                :items="cotizaciones_historicas"
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
                    <b-button @click="ver(row.item)">ver</b-button>
                    <b-dropdown size="sm" variant="secondary">
                    <template #button-content>
                        <span class="sr-only">Opciones</span>
                    </template> 
                    <b-dropdown-item  href="">Nueva versión</b-dropdown-item>
                    <b-dropdown-item  href="">Ver historial</b-dropdown-item>
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
import router from '../router'

export default {
    name: 'TableHistoricoComponent',
    computed:{
    ...mapState('cotizaciones', [ 
        'cotizaciones_historicas',
        'cotiza'
        ])
    }, 
    async mounted()
    { 
    },
    methods: {
        ...mapActions('cotizaciones', [
            'searchFilter', 
            'download', 
            'setCotizacion'
        ]),
        

        async ver(item)
        { 

            console.log('item:: ', item)

            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.item = item

            await this.setCotizacion(payload)

            router.push({
                name: 'cotizaciones_view',  
                params: {
                        id: item.id
                }} 
            )
        },
 
  },
  data: function(){
      return {
            currentPage:1,
            porPagina: 5,
            cliente: null, 
            filters: {
                id: '',
                issuedBy: '',
                issuedTo: ''
            }, 
            loading : false, 
            isBusy: false,
            fields: [
                {  is_select: 'quotation_number', active: false, fil: true, key: 'quotation_number', label: 'Numero de cotización', class: 'text-center' },
                {  is_select: 'company_name', active: false, fil: true, key: 'company_name', label: 'Cliente', class: 'text-center'},
                {  is_select: 'project', active: false, fil: true, key: 'project', label: 'Proyecto', class: 'text-center'},
                {  is_select: false, active: false, fil: true, key: 'created', label: 'Fecha de creación' , class: 'text-center'},
                {  is_select: false, active: false, fil: true, key: 'expiration_date', label: 'Fecha de creación' , class: 'text-center'},
                {  is_select: false, active: false, fil: false, key: 'estado', label: 'Estado' , class: 'text-center'}, 
                {  is_select: false, active: false, fil: false, key: 'acciones',  label:'Acciones', class: 'text-center'}
            ],
            filter: null,
            filterOn: [],         
        }
  } 
}
</script>
