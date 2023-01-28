<template>
  <div>
    <table-component></table-component>
  </div>
</template>


<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import TableComponent from '../../components/Table.vue'
export default {
  name: 'CotizacionVerView',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  },
  components: {
    TableComponent
  }
  ,data(){
    return {
      toastCount: 0,
    }
  }
}
</script>
