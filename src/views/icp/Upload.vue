<template>
  <div> 
      <b-container class="mt-4" fluid >
    <b-card-group class="mt-4" deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Subir archivo icp"
        header-tag="header"> 
        <b-row>
          <b-col sm="6">
                   <fileBase64
                :disabled="false"
                class="ml-1"  
                v-bind:multiple="false"> 
            </fileBase64> 
          
          </b-col> 
        </b-row> 
      </b-card>
    </b-card-group>
    <b-row class="mt-1 mb-4">
      <b-col>
        <b-button 
          @click="upload()"
          variant="pdarwin">
          Subir 
        </b-button>
      </b-col>
    </b-row>

      </b-container>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import fileBase64 from './../../components/fileBase64.vue'


export default {
  name: 'UploadView',
  computed:{
    ...mapState('monedas', ['monedas'])
  },
  components: {
    fileBase64
  },
  async created()
  {
    console.log('beforeCreate..')
    this.loading = this.$loading.show()

  },
  async mounted()
  {

    this.loading.hide()
    console.log('mounted::', this.loading)

  },
  methods:{
    ...mapActions('monedas', ['getAllMonedas']),
    async upload()
    {
      console.log('form:: ', this.form)
    }
  }
  ,data(){
    return {
      loading: null,
      form: {
        file: null
      }
      ,customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ]
    }
  }
}
</script>
