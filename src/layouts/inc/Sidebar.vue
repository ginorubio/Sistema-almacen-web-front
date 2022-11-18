<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/" class="brand-link">
      <img src="/adminlte/dist/img/AdminLTELogo.png" :alt="$store.state.app.name"
        class="brand-image img-circle elevation-3 img-titulo" style="opacity: .8">
      <span class="brand-text font-weight-light">{{ $store.state.app.name }}</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="/adminlte/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ $store.state.username }}</a>
        </div>
      </div>
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!--nav items-->
          <nav-item icon="fas fa-home" link="/">
            Inicio
          </nav-item>
          <nav-item icon="fas fa-tag" link="/producto">
            Productos
          </nav-item>
          <nav-item icon="fas fa-hashtag" link="/categoria">
            Categorías
          </nav-item>
          <nav-item icon="fas fa-list" link="/movimientos">
            Movimientos
          </nav-item>
          <nav-item v-if="$store.state.rol == 'admin' " icon="fas fa-users" link="/gestion-usuario">
            AdmUsuarios
          </nav-item>
          <nav-item icon="fas fa-info-circle" link="/about">
            Información del sistema
          </nav-item>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

</template>

<script>
import NavItem from './NavItem.vue'

export default {
  components: {
    NavItem
  }
}

</script>
<style scoped>
.img-titulo{
    height: 100px;
    width: 50px;
}
</style>
    

