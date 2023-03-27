<template>
  <div>
      <b-card-group deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Detalle de Cotización"
        header-tag="header">  

        <b-row>
          <b-col> 
            <table class="table striped  table-bordered ">
              <tbody>
                <tr>
                  <td class="text-right">PDF</td> <td class="text-left"> 
                    <b-button @click="descargarPDF(cotiza)" variant="link">Descargar PDF</b-button>
                  </td> 
                </tr> 
                <tr v-if="cotiza">
                    <td class="text-right">Cotización</td> 
                    <td class="text-left">
                      {{ cotiza.quotation_number }}
                    </td>
                </tr> 
                <tr v-if="cotiza">
                    <td class="text-right">Iniciar</td> 
                    <td class="text-left">
                      {{  new Date(cotiza.start_date) |   dateFormat('DD-MM-YYYY')  }}
                    </td>
                </tr> 
                <tr v-if="cotiza">
                    <td class="text-right">Expiración</td> 
                    <td class="text-left">
                      {{  new Date(cotiza.expiration_date) |   dateFormat(' DD-MM-YYYY')  }}
                    </td>
                </tr> 
                <tr v-if="cotiza">
                    <td class="text-right">Cliente</td> 
                    <td class="text-left">
                      {{ cotiza.company_name }}
                    </td>
                </tr> 
                <tr>
                  <td class="text-right">Proyecto</td> <td class="text-left">{{ cotiza.project || ''}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Días estimados</td> <td class="text-left">{{ cotiza.estimated_days || ''}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Fecha de creación</td> <td class="text-left">{{ cotiza.created || ''}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Fecha de modificación</td> <td class="text-left">{{ cotiza.modified || ''}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Estado</td> <td class="text-left">
                     <span v-if="cotiza.active==1">Activo</span> 
                     <span v-if="cotiza.active==2">Inactivo</span> 
                    </td>
                  
                </tr>
                <tr>
                  <td class="text-right">Estado Interno</td> <td class="text-left">{{  cotiza.estado  }}</td> 
                </tr>
                <tr>
                  <td class="text-right">Usuario creador</td> <td class="text-left">{{ cotiza.user_creator }}</td>
                </tr>
              </tbody>
            </table>
        
         
          </b-col> 
        </b-row> 
   
      </b-card>
   
      <h3 class="mt-4">ANÁLISIS ASOCIADOS</h3>
      <hr>
      <b-card>
        <b-row class="mt-3"> 
            <b-col sm="12">
                <b-table
                    class="mt-1"
                    striped="striped"
                    :items="servicios_elegidos"
                    :fields="fields_elegidos"
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
     
         
                <template #cell(cost)="row">   
                  {{ row.item.divisa +' '+ row.item.cost }}
                 </template>  
                 <template #cell(name)="row">  
                     {{ row.item.name }}  
                 </template> 
                 <template #cell(acciones)="row">   
                    <b-button @click="ver(row.item)" variant="light" size="sm">Ver</b-button>
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
            </b-col>
      
        </b-row>

      </b-card>
   
      <h3 class="mt-4">Condiciones específicas</h3>
      <hr>
      <b-card class="text-justify row"> 
          <p>

            Tiempo de respuesta ofertado, corresponde a cantidades menores de muestras.
          </p>
          <p>
            Para cantidades masivas, aplican las condiciones generales de la cotización y cantidad de códigos requeridos, de todo lo cotizado.
          </p>
          <p>
            Se puede agregar un día por cada código nuevo requerido al momento de realizar la solicitud.
          </p>

          <p>
            <b>
              TIEMPO DE RESPUESTA REFERIDO EN PRIMERA PÁGINA (Días Estimados), CORRESPONDE A DÍAS HÁBILES.
            </b>
          </p>

          <p>
            Las muestras deben ser entregadas en nuestras dependencias, acompañadas de la solicitud de análisis, indicando Nº de cotización, identificación de las muestras y requerimiento de los métodos (códigos) para cada una de ellas.
          </p>

          <p>
            Las muestras SOLIDAS entregadas preparadas para análisis químico, deben presentar granulometría mínima 95% -150 Ty, secas, homogéneas, debidamente embaladas y rotuladas con la IDENTIFICACIÓN, señalando la matriz de la muestra.
          </p>
          <p>
            Las muestras LÍQUIDAS se deben entregar en recipientes herméticos cerrados sellados a prueba de derrames, rotuladas indicando claramente la matriz de las muestras líquidas (Cianuradas, Ácidas, Básicas Otro) para evitar accidentes en su manipulación. Cantidad mínima requerida  250 ml.
          </p>
          <p>
            Además la solicitud de análisis (documento con que las muestras deben entregarse, debe hacer mención a esta cotización.
          </p>

          <p>
            El servicio considera concepto Facturación Mínima, ESTO IMPLICA que si los requerimientos de cada envío no superan el costo de facturación mínima, APLICA este código y no el valor unitario de los servicios requeridos.
          </p>
          <p>
            <b>
              Servicio requiere pago anticipado
            </b>
             (Muestras se ingresan a sistema Darwin y se ejecuta servicio, por sistema se genera EDP para aprobación, facturación y pago). Transferencia bancaria se debe enviar comprobante a los correos andes.assay@3aaa.cl, con copia a claudia.molina@3aaa.cl, indicando el motivo de la transferencia realizada.
          </p>
          <p>
            Los datos para realizar Transferencia Bancaria son:
          </p>
          <p>
            Banco Chile, cuenta corriente: 54814-06.
          </p>
          <p>
            Rut AAA: 76.377.750-2.
          </p>
          <p>
            El Servicio incluye eliminación de rechazos y pulpas transcurrido un mes desde la emisión de resultados. Para no considerar estos gastos de bodegaje y evitar costos por eliminación, (Si cliente requiere que no sean eliminados los rechazos) el retiro se debe realizar dentro del tiempo estipulado sin costo y el cliente debe dejar claramente establecido en la solicitud del servicio que requiere se haga con rechazos chancados y pulpas sobrantes luego de entregado el servicio solicitado.
          </p>
          <p>
            La solicitud de retiro se debe programar con al menos 3 días de anticipación.
          </p>
          <p>
            <b>
              NO OLVIDAR ACEPTAR LA COTIZACIÓN EN EL VINCULO ENVIADO POR CORREO.
            </b>
          </p>
          <p>
            Eso significa que la cotización satisface requerimientos del cliente.
          </p> 
      </b-card> 

      <h3 class="mt-4">Estado interno de la cotización</h3>
      <b-card> 
          <b-table
                    class="mt-1"
                    striped="striped"
                    :items="items_estado_interno"
                    :fields="fields_estado_interno"
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
     
         
                <template #cell(estado)="row">   
                  {{ row.item.estado }}
                 </template>  
                 <template #cell(comentario)="row">  
                     {{ row.item.comentario }}  
                 </template> 
           
           
     
                <template #empty>
                    <div class="text-center my-2"> 
                        No se encontraron resultados
                    </div>
                </template> 
          </b-table>
          <b-table
                    class="mt-1"
                    striped="striped"
                    :items="fields_aprobacion"
                    :fields="fields_aprobacion"
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
     
         
                <template #cell(aprobacion)="row">   
                  {{ row.item.aprobacion }}
                 </template>  
                 <template #cell(estado)="row">  
                     {{ row.item.estado }}  
                 </template> 
           
                 <template #cell(usuario)="row">  
                     {{ row.item.usuario }}  
                 </template> 
           
           
     
                <template #empty>
                    <div class="text-center my-2"> 
                        No se encontraron resultados
                    </div>
                </template> 
          </b-table> 
      </b-card> 
    </b-card-group> 

  <div> 
    <b-modal ref="my-modal" size="lg" hide-footer title="DATOS DE SERVICIO">
      <b-row class="">  
          <table class="table">
            <tbody>
              <tr>
                <td>Código</td> <td>{{ cotizacion?.assay_name }}</td>
              </tr>
              <tr>
                <td>Tipo</td> <td>{{ cotizacion?.tipo }}</td>
              </tr>
              <tr>
                <td>Técnica</td> <td>{{ cotizacion?.tecnica }}</td>
              </tr>
              <tr>
                <td>Tipo de Muestra</td> <td>{{ cotizacion?.tipo_muestra }}</td>
              </tr>
              <tr>
                <td>Digestión</td> <td>{{ cotizacion?.digestion }}</td>
              </tr>
              <tr>
                <td>Proceso</td> <td>{{ cotizacion?.metodo }}</td>
              </tr>
              <tr>
                <td>Activo</td> 
                <td>
                  <b-badge  v-if="cotizacion?.active" pill  variant="primary">Sí</b-badge>
                  <b-badge  v-if="!cotizacion?.active" pill variant="danger">No</b-badge>
                </td>
              </tr>
              <tr>
                <td>Finalizado</td>
                <td>
                  <b-badge  v-if="cotizacion?.fin" pill  variant="primary">Sí</b-badge>
                  <b-badge  v-if="!cotizacion?.fin" pill variant="danger">No</b-badge>
                </td>
              </tr>
              <tr>
                <td>Costo</td> <td>{{ cotizacion?.divisa+ ' '+cotizacion?.cost  }}</td>
              </tr>
              <tr>
                <td>Peso Nominal</td> <td>{{ cotizacion?.peso+ ' '+cotizacion?.cost  }}</td>
              </tr>
              <tr>
                <td>Volumen Nominal</td> <td>{{ cotizacion?.nominal_volume +' '+cotizacion?.volumen }}</td>
              </tr>
              <tr>
                <td>Descripción Detallada</td> <td>{{ cotizacion?.extensive_description  }}</td>
              </tr>
              <tr>
                <td>Descripción</td> <td>{{ cotizacion?.description }}</td>
              </tr> 
            </tbody>
          </table>

          <table class="table">
            <thead>
              <th>
                <td>Elemento</td>
                <td>Unidad</td>
                <td>Aforo</td>
                <td>Límite inferior</td>
                <td>Límite superior</td>
                <td>Decimales</td>
                <td>Formula</td>
              </th>
            </thead>
            <tbody>
                <tr v-for="(e, index ) in cotizacion?.elementos" :key="index" >
                  <td>{{ e?.symbol }}</td>
                  <td>{{ e?.unidad }}</td>
                  <td>{{ e?.unidad }}</td>
                  <td>{{ e?.symbol_limite_inferior }}</td>
                  <td>{{ e?.symbol_limite_superior }}</td>
                  <td>{{ e?.decimals }}</td>
                  <td>{{ e?.formula }}</td>
                </tr>
            </tbody>
          </table>
      </b-row>
    </b-modal>
  </div>


 
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from 'vuex'
import Swal from "sweetalert2"
import route from '../../router'
import { downloadPDFBase64 } from './../../util/pdfHelper'

export default {
  name: 'CotizacionView',
  computed:{
    ...mapState('cotizaciones', [
      'cotiza', 
      'servicios',  
      'stringMoneda'
    ]),
    ...mapGetters('cotizaciones', [ 
      'ensayosFormat', 
      'muestrasFormat', 
      'digestionesFormat', 
      'tecnicasFormat', 
      'serviciosFormat', 
      'allCotizacionesFormat'
    ]), 
    ...mapState('clientes', [
        'cliente', 
        'validaCliente'
      ])
  }, 
  async mounted()
  { 
       this.getServiciosByAssayId(
       {
          loading: this.$loading,
          toast : this.$toast,  
          id: this.cotiza.id
       }) 

       this.servicios_elegidos = this.cotiza.analisis_asociado

       this.items_estado_interno=[
         {
            "estado": this.cotiza.estado,
            "comentario": this.cotiza.specific_condition
          }
       ] 
       console.log('this.items_estado_interno>>', this.cotiza)


      


  },
  methods:{
    ...mapActions('cotizaciones', [
      'getTipoEnsayo', 
      'getTipoMuestra', 
      'getTipoDigestion', 
      'getTipoTecnica', 
      'getServicios', 
      'setServicios', 
      'setServiciosAll', 
      'deleteServiceAgregado', 
      'addServiceElegido', 
      'finalizar', 
      'getAllCotizaciones',
      'download',
      'setCotizacion',
      'getServiciosByAssayId'
    ]),

    async ver(item)
    {  
      console.log('ver:: ', item)
      this.cotizacion = item
      this.$refs['my-modal'].show()
    },
    async descargarPDF(item)
        { 
          const payload = {}
          payload.loading = this.$loading
          payload.toast = this.$toast
          payload.active = 1
          payload.id = this.cotiza.id
          payload.download = 'pdf' 

          const data =  await this.download(payload) 
          
          console.log('PDF:: ', item)

          await downloadPDFBase64([
          {
              documento: data, 
              contentType: 'application/pdf',
              nombre: `${ item.id }.pdf`
          }]) 
        },

    async showModal() 
    {

      await this.getAllCotizaciones(
      {
          loading: this.$loading,
          toast : this.$toast 

      }) 
      this.$refs['my-modal'].show()
    },
    async elegirServicio(item)
    { 
        const { value } = await Swal.fire({ text: '¿Está seguro que desea agregar este análisis?',  
                        type: 'success', 
                        confirmButtonText: 'Aceptar',
                        showCancelButton: false
                    })

    if(!value) return console.error('no se coloco nombre')

    await this.addServiceElegido(
    {
        loading: this.$loading,
        toast : this.$toast,
        item,
        quotation_id: this.cotiza.id

    }) 
    }, 
    async eliminarServicio(item)
    { 
        await this.deleteServiceAgregado(
        {
            loading: this.$loading,
            toast : this.$toast,
            item 
           
        }) 

    },  
    async finish()
    { 
      const { value } = await Swal.fire({ text: '¿Está seguro que desea terminar de agregar análisis?',  
                          type: 'success', 
                          confirmButtonText: 'Aceptar',
                          showCancelButton: false
                      })

      if(!value) return console.error('no se acepto')

      
      await this.finalizar(
        {
          loading: this.$loading,
          toast : this.$toast,
          quotation_id: this.cotiza.id,
          active : 1
        })
      await route.push({name: 'cotizaciones'})

    },
    async changeCotizacionAll(item)
    {
      this.form.cotizacion_all.value = item.value 
      this.form.cotizacion_all.text = item.text 

    },
    async changeEnsayo(item)
    {
      this.form.tipo_ensayo.value = item.value 
      this.form.tipo_ensayo.text = item.text
      await this.changeServicios()

    },
    async changeMuestra(item)
    {
      this.form.tipo_muestra.value = item.value 
      this.form.tipo_muestra.text = item.text
      await this.changeServicios()

    },
    async changeDigestion(item)
    {
      this.form.tipo_digestion.value = item.value 
      this.form.tipo_digestion.text = item.text
      await this.changeServicios()

    },
    async changeTecnica(item)
    {
      this.form.tipo_tecnica.value = item.value 
      this.form.tipo_tecnica.text = item.text
      await this.changeServicios()

    },
    async changeServicio(item)
    {
      this.form.servicio.value = item.value 
      this.form.servicio.text = item.text 

    },
    async changeServicios()
    {
      await this.getServicios(
       {
          loading: this.$loading,
          toast : this.$toast,
          tipo :"servicios",
          active :1,
          assay_type_id : this.form.tipo_ensayo.value || null,
          sample_type_id : this.form.tipo_muestra.value || null,
          digestion_id : this.form.tipo_digestion.value || null,
          technique_id : this.form.tipo_tecnica.value || null 
       }) 

    },
    
  
    async agregarServicios()
    {  
      await this.setServicios(
        {
          loading: this.$loading,
          toast : this.$toast, 
          active: '1', 
          tipo: 'servicio',
          assay_id: this.form.servicio.value,
          offset : 0,
          limit:10
       }
      ) 

    },
    async agregarServiciosAll()
    {  

      console.log('this.form.servicio.value', this.form.cotizacion_all.value)
      await this.setServiciosAll(
        {
          loading: this.$loading,
          toast : this.$toast,   
          id: this.form.cotizacion_all.value, 
      }
      ) 

      this.$refs['my-modal'].hide()

    }

  }
  ,data()
  {
    return { 
      cotizacion: null, 
      filters: {
            id: '',
            issuedBy: '',
            issuedTo: ''
      }, 
      currentPage:1,
      porPagina: 500,
      loading : false, 
      isBusy: false,
      filter: null,
      filterOn: [], 
      items: [  ],
      items_estado_interno: [ ],
      items_aprobacion: [ ],
      fields_estado_interno: [
            {  is_select: 'Estado Interno', fil: true, key: 'estado', label: 'Estado Interno', class: 'text-center' },
            {  is_select: 'Comentario', active: false, fil: true, key: 'comentario', label: 'Comentario', class: 'text-center'},
      ],
      fields_aprobacion: [
            {  is_select: 'Módulo de Aprobación', fil: true, key: 'aprobacion', label: 'Módulo de Aprobación', class: 'text-center' },
            {  is_select: 'Estado', fil: true, key: 'estado', label: 'Estado', class: 'text-center' },
            {  	Usuario: 'Usuario', active: false, fil: true, key: 'usuario', label: 'Usuario', class: 'text-center'},
      ],
      fields_elegidos: [
            {  is_select: 'Nombre del servicio', active: false, fil: true, key: 'assay_name', label: 'Nombre', class: 'text-center' },
            {  is_select: 'Precio', active: false, fil: true, key: 'cost', label: 'Precio', class: 'text-center'},
            {  is_select: 'Acciones', active: false, fil: true, key: 'acciones', label: 'Acciones', class: 'text-center'} 
      ],
      form: { 
        tipo_ensayo: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_muestra: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_digestion: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_tecnica: { text: null, value: null, isError: false, error: null, class: "select-default" },
        servicio: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cotizacion_all: { text: null, value: null, isError: false, error: null, class: "select-default" },

      }
     
    }
  }
}
</script>
