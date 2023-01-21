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
            <b-input-group  size="sm">
                <b-form-input v-model="form.cliente_rut.value" trim></b-form-input>
            <b-input-group-append>
              <b-button @click="comprobarCliente" :disabled="!form.cliente_rut.value"  variant="pdarwin">Comprobar</b-button>
            </b-input-group-append>
          </b-input-group>
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
              <b-form-input size="sm" id="input-1" v-model="form.destinatario"  trim></b-form-input>
            </b-form-group> 

          </b-col>
          <b-col>
           

              <b-form-group
              label-size="sm"
              description="N° Cotización"
              label="N° Cotización"
              label-for="input-1">
              <b-form-input size="sm"  id="input-1" v-model="form.n_cotizacion"   trim></b-form-input>
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
              <model-select 
                  size="sm"  
                  :options="[]"
                  placeholder="Estado">
              </model-select> 
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
            v-if="empresas.length == 0"
            label-size="sm" 
            label="Si el Proyecto no existe, puede también"
              >
            <b-button @click="crearProyecto"  variant="pdarwin" class="" size="sm">Crear nuevo proyecto</b-button>

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
                  :selectedOption="form.Condiciones"
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
              :editor-toolbar="customToolbar"
               v-model="form.especificaciones">
              </vue-editor>
             
  
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
              <b-input type="number"></b-input> 
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
              <b-form-datepicker id="input-datapike" v-model="form" class="mb-2"></b-form-datepicker>

            </b-form-group> 
              <b-form-group 
              label-size="sm"
              description="Desde"
              label="Días desde"
              label-for="input-datapike2">
              <b-form-datepicker id="input-datapike2" v-model="form" class="mb-2"></b-form-datepicker>

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
              <model-select
                  v-model="form.moneda" 
                  size="sm"  
                  :options="monedas"
                  placeholder="Estado">
              </model-select> 
            </b-form-group>
          </b-col> 
        </b-row> 
      </b-card>
    </b-card-group>
    <b-row class="mt-1 mb-4">
      <b-col>
        <b-button 
        @click="crear()"
        variant="pdarwin">
        Crear cotización</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from 'vuex'
import { ModelSelect, BasicSelect } from 'vue-search-select'
import { VueEditor } from "vue2-editor"
import Swal from "sweetalert2"



export default {
  name: 'CotizacionesNewView',
  computed:{
    ...mapState('monedas', ['monedas']), 
    ...mapState('clientes', ['clientes']), 
    ...mapState('proyectos', ['proyectos']), 
    ...mapState('cotizaciones', ['condiciones']), 
    ...mapGetters('clientes', ['clientesFormat']), 
    ...mapGetters('proyectos', ['proyectosFormat']), 
    ...mapGetters('cotizaciones', ['condicionesFormat']), 

  },
  components: {
      ModelSelect,
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



       await this.getAllMonedas(
       {
         loading: this.$loading,
         toast : this.$toast,
         active: "1",
         tipo: "monedas",
         offset: 0,
         limit: 100
       })

       console.log('paso monedas')

    this.loading.hide()
    console.log('mounted::', this.loading)
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
    ...mapActions('proyectos', ['getProyectos', 'crearProyecto']), 

    async crearProyecto()
    {
        console.log('crear proyecto')

      await Swal.fire({ text: 'Agregar nuevo proyecto', 
                        input: 'text',
                        inputAttributes: {
                          placeholder: 'Nombre del proyecto',
                          autocapitalize: 'off'
                        },
                        type: 'success', 
                        confirmButtonText: 'Aceptar',
                        showCancelButton: true
                    })

      this.loading.hide()
      const payload = {}


      payload.loading = this.$loading
      payload.toast = this.$toast

       const proyecto = await this.crearProyecto(payload)

       console.log('proyecto', proyecto)

    },
    async comprobarCliente()
    {

      this.loading.hide()
      const payload = {}


      payload.loading = this.$loading
      payload.toast = this.$toast

      payload.tipo = 'compañia'

      payload.active= '1'
      payload.offset= 1
      payload.limit= 1
      payload.rut= Number((this.form.cliente_rut.value).split('-')[0])

      const cliente = await this.validaCliente(payload)


      this.form.cliente_nombre.value = cliente.name
      this.form.cliente_active.value = cliente.active ? 'Activo':'Desactivado'

      console.log('form:: ', this.form)
    },
    async changeCliente(item)
    {
      this.form.cliente.value = item.value
      this.form.cliente.text = item.text

      const cliente  = this.clientes.find(cl => cl.id = item.value)

      console.log('cliente', cliente)
      this.form.cliente_rut.value =`${ cliente.rut }-${ cliente.dv }`

      console.log('form:: ', this.form)
    },
    async changeCondiciones(item)
    {
      this.form.condiciones.value = item.value
      this.form.condiciones.text = item.text
    },
    async crear()
    {
      console.log('form:: ', this.form)

         
    }
  }
  ,data(){
    return {
      loading: null,
      empresas: [],
      form: {
        moneda: null,
        cliente: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cliente_rut: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cliente_nombre: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cliente_active: { text: null, value: null, isError: false, error: null, class: "select-default" },
        Condiciones: { text: null, value: null, isError: false, error: null, class: "select-default" },

      }
      ,customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ]
    }
  }
}
</script>
