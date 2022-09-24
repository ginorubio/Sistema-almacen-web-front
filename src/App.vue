<template>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex';

  export default{
    methods: {
      //...mapActions(['leerToken','cerrarSesion'])
      ...mapActions(['leerToken'])
    },
    created(){
      this.leerToken()
    }
  }
</script>

