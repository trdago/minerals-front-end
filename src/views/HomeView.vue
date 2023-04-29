<template>
  <div>

    <b-container class="h-75 d-inline-block" fluid >
      <b-container>
      <b-row class="mt-4">
        <b-col>

          <h2>
           <b-icon icon="house-door-fill"></b-icon> BIENVENIDO
          </h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
         <span class="h1" v-if="user">{{ user.name }} {{ user.lastname_f}}</span>
        <hr >
        </b-col>
      </b-row>

      </b-container>


  

    
    </b-container>


  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'HomeView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  },
  components: {
  }
 ,data(){
    return {
      toastCount: 0
    }
  }
}
</script>
