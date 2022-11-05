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
              description="Ingresa el nombre del cliente"
              label="Nombre del Cliente"
              label-for="input-1">
              <b-form-input size="sm" id="input-1" v-model="name" :state="state" trim></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group 
            label-size="sm"
            description="Run del cliente"
            label="Rut Cliente"
            label-for="input-1">
            <b-form-input size="sm"  id="input-1" v-model="name" :state="state" trim></b-form-input>
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
              <b-form-input size="sm" id="input-1" v-model="name" :state="state" trim></b-form-input>
            </b-form-group> 
          </b-col>
          <b-col>
            <b-form-group
            label-size="sm"
            description="Nombre cliente"
            label="Nombre cliente"
            label-for="input-1">
            <b-form-input size="sm" :disabled="true" id="input-1" v-model="name" :state="state" trim></b-form-input>
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
              <b-form-input size="sm"  id="input-1" v-model="name" :state="state" trim></b-form-input>
            </b-form-group>
          

          </b-col>
          <b-col>
            <b-form-group
            label-size="sm"
            description="Estado cliente"
            label="Estado cliente"
            label-for="input-1">
            <b-form-input size="sm" :disabled="true" id="input-1" v-model="name" :state="state" trim></b-form-input>
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
            <b-button class="mt-4" size="sm">Crear nuevo proyecto</b-button>

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
          <b-col>
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
          <b-col>
            <b-button class="mt-4" size="sm">Crear nuevo proyecto</b-button>

          </b-col>

        </b-row> 
      </b-card>
    </b-card-group>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import { ModelSelect } from 'vue-search-select'

export default {
  name: 'CotizacionesNewView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  },
  components: {
      ModelSelect

  }
  ,data(){
    return {
      toastCount: 0,
    }
  }
}
</script>
