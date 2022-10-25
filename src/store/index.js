import { createStore } from 'vuex'
import VueJwtDecode from "vue-jwt-decode";

export default createStore({
  state: {
    token: null,
    app: {
      name: 'Almacena Mercantil',
      user: ''
    }
  },
  getters: {
  },
  mutations: {
    login(state,token) {
      //decodificando el token del backend, debe contener datos generales del Usuario,
      //para posteriormente ser guardados en el state de la aplicacion
      //y accedido desde cualquier parte de la aplicacion
      let decoded = VueJwtDecode.decode(token);

      state.app.user = decoded.nombre
      state.token = token;

      //guardamos en el localStoge el token y datos generales del usuario
      localStorage.setItem('token', token)
      localStorage.setItem('user', decoded.nombre)
    },
    leerToken(state) {
      if (localStorage.getItem('token')) {
        //recuperamos el token y los datos generales del usuario
        state.token = localStorage.getItem('token')
        state.app.user = localStorage.getItem('user')
      } else {
        state.token = null;
      }
    },
    logout(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.token = null;
      state.app.user = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
