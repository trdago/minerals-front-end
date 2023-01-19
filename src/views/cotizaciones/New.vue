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
              <model-select 
                  size="sm"  
                  :options="[]"
                  placeholder="Cliente">
              </model-select> 
            </b-form-group>
          </b-col>
          <b-col> 
            <b-form-group 
           
            label-size="sm"
            description="Run del cliente"
            label="Rut Cliente"
            label-for="input-1">


            <b-form-input   size="sm"  v-model="form.run_cliente"  trim></b-form-input> 
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
            description="Nombre cliente"
            label="Nombre cliente"
            label-for="input-1">
            <b-form-input size="sm" :disabled="true" id="input-1" v-model="form.nombre_cliente_dos"   trim></b-form-input>
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
              <b-form-input size="sm"  id="input-1" v-model="form.n_cotizacion"   trim></b-form-input>
            </b-form-group>
          

          </b-col>
          <b-col>
            <b-form-group
            label-size="sm"
            description="Estado cliente"
            label="Estado cliente"
            label-for="input-1">
            <b-form-input size="sm" :disabled="true" id="input-1" v-model="form.estado_cliente"   trim></b-form-input>
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
            <b-button  variant="pdarwin" class="mt-4" size="sm">Crear nuevo proyecto</b-button>

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
              <model-select 
                  size="sm"  
                  :options="[]"
                  placeholder="Estado">
              </model-select> 
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
import { mapState, mapActions } from 'vuex'
import { ModelSelect } from 'vue-search-select'
import { VueEditor } from "vue2-editor";


export default {
  name: 'CotizacionesNewView',
  computed:{
    ...mapState('monedas', ['monedas']), 
  },
  components: {
      ModelSelect,
      VueEditor
  },
  async created()
  {
    console.log('beforeCreate..')
    this.loading = this.$loading.show()

  },
  async mounted()
  {
      // await this.getAllMonedas(
      // {
      //   loading: this.loading,
      //   toast : this.$toast,
      //   active: "1",
      //   tipo: "monedas",
      //   offset: 0,
      //   limit: 100
      // })
    this.loading.hide()
    console.log('mounted::', this.loading)

  },
  methods:{
    ...mapActions('monedas', ['getAllMonedas']),
    async crear()
    {
      console.log('form:: ', this.form)
    }
  }
  ,data(){
    return {
      loading: null,
      form: {
        moneda: null,

      }
      ,customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ]
    }
  }
}
</script>
