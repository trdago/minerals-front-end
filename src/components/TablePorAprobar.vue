<template>
<div> 
    <b-row>
        <b-col sm="12">
            <b-alert show variant="warning">
                Cotizaciones por Aprobar. Presione sobre el botón aprobar o rechazar de una cotización.            </b-alert>
        </b-col>
    </b-row>
    <b-row>
        <b-table
            striped="striped"
            :items="cotizaciones_por_aprobar"
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
                <b-button variant="danger" @click="rechazar(row.item)">Rechazar</b-button>
                <b-button v-if="!row.item.ap_ventas" variant="success" @click="aprobarVenta(row.item)">Aprobar (Venta)</b-button>
                <b-button v-if="!row.item.ap_prod" variant="success" @click="aprobarProduccion(row.item)">Aprobar (Produccion)</b-button>
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
import Swal from "sweetalert2"

export default {
    name: 'TablePorAprobarComponent',
    computed:{
    ...mapState('cotizaciones', [ 
        'cotizaciones_por_aprobar', 
        'cotiza'
        ])
    }, 
    async mounted()
    { 

        const payload = {}
        payload.loading = this.$loading
        payload.toast = this.$toast 
        payload.limit = this.porPagina
        payload.offset =  this.porPagina * (this.currentPage - 1)

        await this.getCotizacionesPorAprobar(payload)  

    },
    methods: {
        ...mapActions('cotizaciones', [ 
            'getCotizacionesPorAprobar',
            'setCotizacion',
            'cotizacionAccion',
            'quotationAction'
        ]), 
        async aprobarProduccion(item)
        {     
            const { value } = await Swal.fire(
                    { 
                        title: '¿Está seguro?',  
                        type: 'default',  
                        confirmButtonText: 'Aceptar',
                        showCancelButton: true
                    }) 
            if(!value) return console.info('Cancelado')

            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.id = item.id       
            payload.accion = 'aprobar_produccion'     
            await this.quotationAction(payload)
            payload.loading = this.$loading
            payload.toast = this.$toast 
            payload.limit = this.porPagina
            payload.offset =  this.porPagina * (this.currentPage - 1)

        await this.getCotizacionesPorAprobar(payload)  

        },
        async aprobarVenta(item)
        {     
            const { value } = await Swal.fire(
                    { 
                        title: '¿Está seguro?',  
                        type: 'default',  
                        confirmButtonText: 'Aceptar',
                        showCancelButton: true
                    }) 
            if(!value) return console.info('Cancelado')

            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.active = 1
            payload.id = item.id       
            payload.accion = 'aprobar_venta'     
            await this.quotationAction(payload)
            payload.loading = this.$loading
            payload.toast = this.$toast 
            payload.limit = this.porPagina
            payload.offset =  this.porPagina * (this.currentPage - 1)

        await this.getCotizacionesPorAprobar(payload)  
        },
        async rechazar(item)
        {      
            const { value } = await Swal.fire(
                    { 
                        title: `¿Está seguro que desea rechazar esta Cotización: ${ item.quotation_number } ?`,  
                        text:'Comentario',
                        type: 'default', 
                        input: 'textarea',
                        confirmButtonText: 'Aceptar',
                        showCancelButton: true
                    }) 
            if(!value) return console.info('Cancelado')

            const payload = {}
            payload.loading = this.$loading
            payload.toast = this.$toast
            payload.id = item.id       
            payload.accion = 'rechazar'     
            payload.comentario = value       

            await this.quotationAction(payload)
            payload.loading = this.$loading
            payload.toast = this.$toast 
            payload.limit = this.porPagina
            payload.offset =  this.porPagina * (this.currentPage - 1)

        await this.getCotizacionesPorAprobar(payload)  
        },
        async ver(item)
        {   
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
            {  is_select: 'quotation_number', active: false, fil: true, key: 'quotation_number', label: 'Cotizacion', class: 'text-center'},
                {  is_select: 'company_name', active: false, fil: true, key: 'company_name', label: 'Cliente', class: 'text-center'},
                {  is_select: 'state_id', active: false, fil: true, key: 'state_id',  label:'Estado', class: 'text-center'},
                {  is_select: false, active: false, fil: false, key: 'acciones',  label:'Acciones', class: 'text-center'}
            ],
            filter: null,
            filterOn: [],         
        }
  } 
}
</script>
