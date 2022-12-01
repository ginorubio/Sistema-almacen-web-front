import { createStore } from 'vuex'
import VueJwtDecode from "vue-jwt-decode";

export default createStore({
  state: {
    token: null,
    app: {
      name: 'Almacenera Mercantil',  
    },
    username: '',
    rol: '',
    id: ''

  },
  getters: {
  },
  mutations: {
    login(state,token) {
      //decodificando el token del backend, debe contener datos generales del Usuario,
      //para posteriormente ser guardados en el state de la aplicacion
      //y accedido desde cualquier parte de la aplicacion
      let decoded = VueJwtDecode.decode(token);
      console.log("Decodificacion: "+token)
      state.username = decoded.username;
      state.rol = decoded.rol;
      state.id= decoded.id;
      state.token = token;

      //guardamos en el localStoge el token y datos generales del usuario
      localStorage.setItem('token', token)
      localStorage.setItem('username', decoded.username)
      localStorage.setItem('rol', decoded.rol)
      localStorage.setItem('id',decoded.id)
    },
    leerToken(state) {
      if (localStorage.getItem('token')) {
        //recuperamos el token y los datos generales del usuario
        state.token = localStorage.getItem('token')
        state.username = localStorage.getItem('username')
        state.rol = localStorage.getItem('rol')
        state.id = localStorage.getItem('id')
      } else {
        state.token = null;
      }
    },
    logout(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('rol')
      localStorage.removeItem('id')
      state.token = null;
      state.username = null;
      state.rol = null;
      state.id = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
