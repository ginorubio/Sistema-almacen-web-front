<template>
  <router-view/>
</template>

<script>
  export default{

    mounted(){
      this.$store.commit('leerToken')
    }
  }
</script>

