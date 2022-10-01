<template>

<!-- Site wrapper -->
<div class="wrapper">
    <navbar/>
    <sidebar/>

  <!-- Content Wrapper. Contenido de la pagina actual -->
  <div class="content-wrapper">
    <router-view/> 
  </div>
  <!-- /.content-wrapper -->

  <footer class="main-footer">
    <div class="float-right d-none d-sm-block">
      <b>Version</b> 3.0.4
    </div>
    <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong> All rights
    reserved.
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

</template>
<script>
    import Navbar from "./inc/Navbar.vue"
    import Sidebar from "./inc/Sidebar.vue"

    export default{
        components:{
            Navbar, Sidebar
        }
    }

</script>
