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
            <div v-for="producto in productos">
              <a href=""> {{producto.descripcion}} - {{producto.precio}} </a>
            </div>
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
    data(){
      return {
        productos: []
      }
    },
    computed: {
      ...mapState(['token'])
    },
    methods: {
      async mostrarProductos(){
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
          this.productos =  response;


        }catch(error){
          console.log(error)
        }
      }
    },
    created(){
      this.mostrarProductos()
    }
}
</script>