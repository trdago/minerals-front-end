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
            <b-form-group 
              label-size="sm"
              description="Nombre cliente"
              label="Seleccione cliente"
              label-for="input-1">
              <basic-select
                  :selectedOption="form.cliente"
                  @select="changeCliente"
                  size="sm"  
                  :options="clientesFormat"
                  placeholder="Cliente">
              </basic-select> 
            </b-form-group>
          </b-col>
          <b-col> 
            <b-form-group  
            label-size="sm"
            description="Run del cliente"
            label="Rut Cliente"
            label-for="input-1">
            <b-input-group 
            :class="{ 'is-invalid': $v.form.cliente_rut.value.$invalid }"  
            size="sm">
                <b-form-input  
                :class="{ 'is-invalid': $v.form.cliente_rut.value.$invalid }" 
                 v-model="form.cliente_rut.value" trim></b-form-input>
            <b-input-group-append>
              <b-button @click="comprobarCliente" :disabled="!form.cliente_rut.value"  variant="pdarwin">Comprobar</b-button>
            </b-input-group-append>
          </b-input-group>
          <div class="invalid-feedback">
                El RUT es requerido
              </div>
          </b-form-group>


          </b-col>

        </b-row>
        <b-row>
          <b-col>
              <b-form-group
            label-size="sm"
            description="Estado cliente"
            label="Estado cliente"
            label-for="input-1">
            <b-form-input size="sm" :disabled="true" v-model="form.cliente_active.value"   trim></b-form-input>
          </b-form-group> 
          
          </b-col>
          <b-col>
            <b-form-group
            label-size="sm"
            description="Nombre cliente"
            label="Nombre cliente"
            label-for="input-1">
            <b-form-input size="sm" :disabled="true" id="input-1" v-model="form.cliente_nombre.value"   trim></b-form-input>
          </b-form-group>

          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group
              label-size="sm"
              description="Destinatario"
              label="Destinatario"
              label-for="input-1">
              <b-form-input :class="{ 'is-invalid': $v.form.destinatario.value.$invalid }"  size="sm" id="input-1" v-model="form.destinatario.value"  trim></b-form-input>
              <div class="invalid-feedback">
                El Destinatario es requerido
              </div>
            </b-form-group> 

          </b-col>
          <b-col>
            <b-form-group
            v-if="empresas.length == 0"
            label-size="sm" 
            label="Si el Destinatario no existe, puede también Crear nuevo Destinatario"
              >
            <b-button :disabled="!form.cliente.value" @click="newDestinatario"  variant="pdarwin" class="" size="sm">Crear nuevo Destinatario</b-button>

            </b-form-group>


          </b-col>

        </b-row> 
        <b-row>
          <b-col>
           <b-form-group
           label-size="sm"
           description="N° Cotización"
           label="N° Cotización"
           label-for="input-1">
           <b-form-input size="sm"  id="input-1" v-model="form.cotizacion.value"   trim></b-form-input>
         </b-form-group>
       
          </b-col>
          <b-col>
            <b-form-group
           label-size="sm"
           label="Pago previo"
           label-for="input-1">
            <b-form-radio name="radio-size" size="sm">SÍ</b-form-radio>
            <b-form-radio name="radio-size" size="sm">NO</b-form-radio>
         </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>
    <b-card-group class="mt-1" deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Proyecto"
        header-tag="header"> 
        <b-row>
          <b-col>
            <b-form-group 
              label-size="sm"
              description="Seleccione un Proyecto"
              label="Seleccione un Proyecto"
              label-for="input-1">
              
              <basic-select 
                  :isError="$v.form.proyecto.value.$invalid"
                  :selectedOption="form.proyecto"
                  :disabled="proyectosFormat.length == 0"
                  @select="changeProyecto"
                  size="sm"  
                  :options="proyectosFormat"
                  placeholder="Estado">
              </basic-select> 
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
            v-if="empresas.length == 0"
            label-size="sm" 
            label="Si el Proyecto no existe, puede también Crear nuevo proyecto"
              >
            <b-button :disabled="!form.cliente.value" @click="newProyecto"  variant="pdarwin" class="" size="sm">Crear nuevo proyecto</b-button>

            </b-form-group>


          </b-col>

        </b-row> 
      </b-card>
    </b-card-group>
    <b-card-group class="mt-1" deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Condiciones"
        header-tag="header"> 
        <b-row>
          <b-col sm="6">
            <b-form-group 
              label-size="sm"
              description="Condiciones generales"
              label="Condiciones generales"
              label-for="input-1">

              <basic-select
                  :selectedOption="form.condiciones"
                  :isError="$v.form.condiciones.value.$invalid"
                  @select="changeCondiciones"
                  size="sm"  
                  :options="condicionesFormat"
                  placeholder="Condiciones">
              </basic-select> 
            </b-form-group>
          </b-col> 

        </b-row> 
        <b-row> 
          <b-col>   
            <b-form-group 
            label-size="sm"
            description="Condiciones especificas"
            label="Condiciones especificas"  
            label-for="input-1">
            <vue-editor
              :class="{ 'is-invalid': $v.form.especificaciones.value.$invalid }"  
              :editor-toolbar="customToolbar"
               v-model="form.especificaciones.value">
              </vue-editor>
              <div class="invalid-feedback">
                Las especificaciones son requeridas
              </div>
  
            </b-form-group>

          </b-col>

        </b-row> 
      </b-card>
    </b-card-group>
    <b-card-group class="mt-1" deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Tiempo estimado del proceso"
        header-tag="header"> 
        <b-row>
          <b-col sm="6">
            <b-form-group 
              label-size="sm"
              description="Días hábiles"
              label="Días hábiles"
              label-for="input-1">
              <b-input v-model="form.tiempo.value" type="number">12</b-input> 
            </b-form-group>
          </b-col> 

        </b-row>  
      </b-card>
    </b-card-group>
    <b-card-group class="mt-1" deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Vigencia"
        header-tag="header"> 
        <b-row>
          <b-col sm="6">
              <b-form-group 
              label-size="sm"
              description="Desde"
              label="Días desde"
              label-for="input-datapike">
              <b-form-datepicker
              :class="{ 'is-invalid': $v.form.desde.value.$invalid }"  
              id="input-datapike" v-model="form.desde.value" class="mb-2"></b-form-datepicker>

            </b-form-group> 
              <b-form-group 
              label-size="sm"
              description="hasta"
              label="Días hasta"
              label-for="input-datapike2">
              <b-form-datepicker 
              :class="{ 'is-invalid': $v.form.hasta.value.$invalid }"  
              id="input-datapike2" v-model="form.hasta.value" class="mb-2"></b-form-datepicker>

            </b-form-group> 
          </b-col> 

        </b-row>  
      </b-card>
    </b-card-group>

    <b-card-group class="mt-1" deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Moneda de la cotización"
        header-tag="header"> 
        <b-row>
          <b-col sm="6">
            <b-form-group 
              label-size="sm"
              description="Moneda"
              label="Moneda"
              label-for="input-1">
               <basic-select
                  :isError="$v.form.moneda.value.$invalid"
                  :selectedOption="form.moneda"
                  @select="changeMonedas"
                  size="sm"  
                  :options="monedasFormat"
                  placeholder="Elegir moneda">
              </basic-select> 
            </b-form-group>
          </b-col> 
        </b-row> 
      </b-card>
    </b-card-group>
    <b-row class="mt-1 mb-4">
      <b-col>
        <b-button 
        :disabled="$v.form.$invalid"
        @click="crear()"
        variant="pdarwin">
        Crear cotización</b-button>
      </b-col>
    </b-row>
    <b-modal ref="my-modal" size="lg" hide-footer title="crear nuevo destinatario">
      <b-row class=""> 
          <b-col sm="12">

              <span>Nombre</span>
              <input v-model="form.name.value" placeholder="Agregar Nombres y apellidos">
              <span>Telefono</span>
              <input v-model="form.telefono.value" placeholder="Agregar telefono">
              <span>Correo</span>
              <input v-model="form.mail.value" placeholder="Agregar Correo electronico">
              <b-button-group class="col-sm-12">
              <b-button @click="crearDetinatario" variant="dark" size="sm">Guardar</b-button>
              
            </b-button-group>
          </b-col>
        </b-row>
    </b-modal>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from 'vuex'
import { BasicSelect } from 'vue-search-select'
import { VueEditor } from "vue2-editor"
import Swal from "sweetalert2"

// const { format, validate, clean  } = require('rut.js')
const { format, clean, validate } = require('rut.js')

// import { required, email, sameAs, maxLength } from 'vuelidate/lib/validators'
import { required } from 'vuelidate/lib/validators'



export default {
  name: 'CotizacionesNewView',
  computed:{
    ...mapState('monedas', ['monedas']), 
    ...mapState('clientes', ['clientes']), 
    ...mapState('proyectos', ['proyectos']), 
    ...mapState('cotizaciones', ['condiciones']), 
    ...mapGetters('clientes', ['clientesFormat', 'proyectosFormat']), 
    ...mapGetters('cotizaciones', ['condicionesFormat']), 
    ...mapGetters('monedas', ['monedasFormat']), 

  },
  components: {
      BasicSelect,
      VueEditor
  },
  async created()
  {
    console.log('beforeCreate..')
    this.loading = this.$loading.show()

  }, 
  async mounted()
  {
       await this.searchCondiciones(
       {
         loading: this.$loading,
         toast : this.$toast,
         active: "1",
         tipo: "condiciones",
         offset: 0,
         limit: 20
       })

       await this.getAllMonedas(
       {
         loading: this.$loading,
         toast : this.$toast,
         active: "1",
         tipo: "monedas",
         offset: 0,
         limit: 100
       }) 

    this.loading.hide()
    const payload = {}


    payload.loading = this.$loading
    payload.toast = this.$toast

    payload.tipo = 'compañias'

    payload.active= '1'
    payload.offset= 1
    payload.limit= 1
    payload.id= 0
    payload.todas= 'si'

    await this.getClientes(payload)


  },
  methods:{
    ...mapActions('monedas', ['getAllMonedas']),
    ...mapActions('clientes', ['getClientes', 'validaCliente']), 
    ...mapActions('proyectos', ['getProyectos']), 
    ...mapActions('cotizaciones', ['searchCondiciones', 'crearProyecto', 'crearCotizacion', 'setModena', 'crearDestinatario']), 

    async newProyecto()
    {
        console.log('crear proyecto')

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

    this.loading.hide()
    const payload = {}

    payload.loading = this.$loading
    payload.toast = this.$toast
    payload.accion = 'nuevo_proyecto'
    payload.company_id = this.form.cliente.value
    payload.name = value

    const proyecto = await this.crearProyecto(payload)

    console.log('proyecto:: ', proyecto)
    
    await this.comprobarCliente()
    
      // console.log('proyecto', proyecto)

    },
    async comprobarCliente()
    {

      this.form.cliente_rut.value = format(this.form.cliente_rut.value)

      this.loading.hide()
      const payload = {}


      payload.loading = this.$loading
      payload.toast = this.$toast

      payload.tipo = 'compañia'

      payload.active= '1'
      payload.offset= 1
      payload.limit= 1

      if(!validate(this.form.cliente_rut.value)) 
        return  this.$toast.error('Rut de cliente invalido')

      // payload.rut= Number((this.form.cliente_rut.value).split('-')[0])
      payload.rut= clean(this.form.cliente_rut.value)
      payload.rut= payload.rut.substr(0, payload.rut.length - 1)

      const cliente = await this.validaCliente(payload)

      
      this.form.cliente_nombre.value = cliente.name
      this.form.cliente_active.value = cliente.active ? 'Activo':'Desactivado'
      this.form.cotizacion.value = cliente.quotation_number 
    },
    async changeCliente(item)
    {

      console.log('iem cliente:::', item)
      this.form.cliente.value = item.value
      this.form.cliente.text = item.text

      const cliente  = this.clientes.find(cl => cl.id ==item.value)

      console.log('cliente::', cliente)
      this.form.cliente_rut.value = format(`${ cliente.rut }${ cliente.dv }`)

      console.log('form:: ', this.form)
    },
    async changeProyecto(item)
    {

      this.form.proyecto.value = item.value
      this.form.proyecto.text = item.text 
    },
    async changeCondiciones(item)
    {
      this.form.condiciones.value = item.value
      this.form.condiciones.text = item.text
    },
    async changeMonedas(item)
    {
      this.form.moneda.value = item.value
      this.form.moneda.text = item.text
      this.setModena(this.form.moneda.text)
    },
    async crear()
    {

      this.loading.hide()
      const payload = {}


      payload.loading = this.$loading
      payload.toast = this.$toast
      payload.accion = 'nueva_cotizacion'
      payload.active = "0"
      payload.expiration_date = this.form.hasta.value
      payload.company_id = this.form.cliente.value 
      payload.estimated_days = this.form.tiempo.value
      payload.proyect_id = this.form.proyecto.value
      payload.destinatario = this.form.destinatario.value

      payload.currency_id = this.form.moneda.value
      payload.quotation_state_id = 5
      payload.version = 1
      payload.general_condition_id = 1
      payload.state_id = 1
      payload.start_date = this.form.desde.value
      payload.specific_condition = this.form.especificaciones.value
      payload.quotation_number = this.form.cotizacion.value

      await this.crearCotizacion(payload) 

      

         
    },
    async newDestinatario(){
      // this.form.id.value =item
      console.log("destinatario", this.form.destinatario);
      this.$refs['my-modal'].show()


    },
    async CrearNewDestinatario(){
      this.loading.hide()
      const payload = {}
      payload.loading = this.$loading
      payload.toast = this.$toast
      payload.company_id = this.form.cliente.value
      payload.mail= this.form.mail.value,
      payload.name=this.form.name.value
      payload.telefono = this.form.telefono.value

      const destinatario = await this.crearDestinatario(payload)
      console.log("destina", destinatario);
    }
  },
  validations :{   
        form: {
          cliente_rut : { value: { required } }, 
          moneda : { value: { required } }, 
          desde : { value: { required } }, 
          hasta : { value: { required } }, 
          condiciones : { value: { required } }, 
          destinatario : { value: { required } }, 
          proyecto : { value: { required } }, 
          especificaciones : { value: { required }}, 
        }
  }
  ,data(){
    return { 
      loading: null,
      empresas: [],
      form: {
        cliente: { text: null, value: null, isError: false, error: null, class: "select-default" },
        proyecto: { text: null, value: null, isError: false, error: null, class: "select-default" },
        especificaciones: { text: null, value: null, isError: false, error: null, class: "select-default" },
        destinatario: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cliente_rut: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cliente_nombre: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cliente_active: { text: null, value: null, isError: false, error: null, class: "select-default" },
        condiciones: { text: null, value: null, isError: false, error: null, class: "select-default" },
        monedas: { text: null, value: null, isError: false, error: null, class: "select-default" },
        moneda: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tiempo: { text: null, value: 12, isError: false, error: null, class: "select-default" },
        desde: { text: null, value: null, isError: false, error: null, class: "select-default" },
        hasta: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cotizacion: { text: null, value: null, isError: false, error: null, class: "select-default" },
        mail: { text: null, value: null, isError: false, error: null, class: "select-default" },
        name: { text: null, value: null, isError: false, error: null, class: "select-default" },
        telefono: { text: null, value: null, isError: false, error: null, class: "select-default" },
        pago_previo: { text: null, value: null, isError: false, error: null, class: "select-default" },      

      }
      ,customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ]
    }
  }
}
</script>
