<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Perfil y logout Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-user"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="#" class="dropdown-item" @click="logout">
            <i class="fas fa-sign-out-alt mr-2"></i>Cerrar Sesión
          </a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.commit('logout');
    }
  },
  mounted() {
    this.$store.commit('leerToken');
  }
}
</script>
