<template>
  <content-header title="About" />
  <content>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">About</h3>
          </div>
          <div class="card-body" >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis consequatur amet magnam officiis temporibus. Voluptas laboriosam dolorem a id rerum. Voluptatem eos saepe voluptates tempore, beatae iure libero consectetur unde!
          </div>
          <div class="card-footer">
            Footer
          </div>
        </div>

      </div>
    </div>
  </content>
</template>

<script>
import { mapState } from 'vuex';
import ContentHeader from '@/components/ContentHeader.vue';
import Content from '@/components/Content.vue';

export default{
    components:{
      ContentHeader, Content
    },
    computed: {
      ...mapState(['token'])
    },
    methods: {
      async datosProtegidos(){
        try{
          //ruta para obtener información del back
          const res = await fetch('http://localhost:5000/api/tienda/productos/misproductos',{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          })
          /*otra forma de mandar la autorización con 
          'auth-token': this.token 
          depende de como sea codeado el Backend
          */
          const response = await res.json()
          console.log(response)


        }catch(error){
          console.log(error)
        }
      }
    },
    created(){
      this.datosProtegidos()
    }
}
</script>