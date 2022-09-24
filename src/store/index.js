import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    app: {
      name: 'App Almacen'
    }
  },
  getters: {
  },
  mutations: {
    setToken(state, payload){
      state.token = payload
    }
  },
  actions: {
    async login({commit}, usuario){
      console.log(usuario)
      try{
        //solicitud al backend
        const res = await fetch('http://localhost:5000/api/tienda/auth/login/user',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } ,
          body: JSON.stringify(usuario)
        })
        const response = await res.json()
        console.log(response.jwtToken)

        //commit nos permite llamar a la mutación
        commit('setToken', response.jwtToken)

        localStorage.setItem('token', response.jwtToken)
        
        window.location.href = "/";

      }catch(error){
        console.log(error)
      }
    },
    leerToken({commit}){
      if(localStorage.getItem('token')){
        commit('setToken', localStorage.getItem('token'))
      }else{
        commit('setToken',null)
      }
    },
    cerrarSesion({commit}){
      localStorage.removeItem('token')
      commit('setToken',null)
    }
  },
  modules: {
  }
})
