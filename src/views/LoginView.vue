<template>

  <img class="wave" alt="Vue logo" src="../assets/wave.png">
  <div class="container-personalized">
    <div class="img">
      <img src="../assets/icono-login.png" alt="">
    </div>
    <div class="login-container">
      <form @submit.prevent="login()">
        <img class="avatar" src="../assets/logo.png" alt="">
        
        <div class="input-div one">
          <div class="i">
            <i class="fas fa-user" aria-hidden="true"></i>
          </div>
          <div>
            <h5>Correo</h5>
            <input class="input" type="email" required v-model="usuario.email">
          </div>
        </div>
        <div class="input-div two">
          <div class="i">
            <i class="fas fa-lock" aria-hidden="true"></i>
          </div>
          <div>
            <h5>Contraseña</h5>
            <input class="input" type="password" required v-model="usuario.password">
          </div>
        </div>
        <p v-if="usuario.error" class="text-danger">Correo o contraseña incorrecta.</p>
        <button class="btn" type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </div>

</template>
  
<script>
import { ServicioAuth } from '../services/ServicesAuth.js'

export default {
  beforeMount() {
    $('title').html(`Login | ${this.$store.state.app.name}`);
  },
  data() {
    return {
      usuario: {
        email: '',
        password: '',
        error: false
      }
    }
  },
  methods: {
    async login() {
      const servicioauth = new ServicioAuth()

      servicioauth.login(this.usuario).then(data => {
        const response = data
        if (response.token) {
          //buscando la mutacion login para guardar el token en el state
          this.$store.commit('login', response.token)

          //enrutamos a la siguiente ruta
          this.$router.push({ name: "home" })
        } else {
          this.usuario.error = true;
        }
      }, error => {
        this.usuario.error = true;
      })
    }
  },
  mounted() {
    //llamamos a la mutacion del Store con nombre leertoken 
    this.$store.commit('leerToken')
  }
}
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.container-personalized {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img img {
  width: 500px;
}

.login-container {
  display: flex;
  align-items: center;
  text-align: center;
}

form {
  width: 360px;
}

.avatar {
  width: 250px;
  
}

form h1 {
  font-size: 2.9rem;
  text-transform: uppercase;
  margin: 15px 0;
  color: #333;
}

.input-div {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.input-div:after,
.input-div:before {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 50%;
  height: 2px;
  background-color: #38d39f;
  transition: .3s;
}

.input-div:after {
  right: 50%;
}

.input-div:before {
  left: 50%;
}

.input-div .one {
  margin-top: 0;
}

.input-div .two {
  margin-bottom: 4px;
}

.i {
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i {
  color: #d9d9d9;
}

.input-div>div {
  position: relative;
  height: 45px;
}

.input-div>div h5 {
  position: absolute;
  left: 10px;
  top: 0;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: .3s;
}

.input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: .3s;
}

a:hover {
  color: #38d39f;
}

.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin: 1rem 0;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #680197, #00ffbf, #c046f8);
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  background-size: 200%;
  transition: .5s;
}

.btn:hover {
  background-position: right;
}

@media screen and (max-width: 1050px) {
  .container-personalized {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  .form {
    width: 200px;
  }

  .login-container h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

/**celulares*/
@media screen and (max-width: 900px) {
  .container-personalized {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .wave {
    display: none;
  }

  .login-container {
    justify-content: center;
  }
}
</style>
