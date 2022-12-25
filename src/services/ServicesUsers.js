import store from '../store'

export class ServicioUsuario {
    URL = process.env.VUE_APP_SERVICE_URL+"/users";
    constructor() {
        this.cabecera = {
            'Content-Type': 'application/json',
            'x-access-token': `${store.state.token}`
        }
    }

    async mostrar() {
        try {
            //ruta para obtener información del back
            const res = await fetch(this.URL + "/read", { headers: this.cabecera })
            const response = await res.json()

            return response;

        } catch (error) {
            return error
        }
    }
    async mostrarInhabilitados() {
        try {
            //ruta para obtener información del back
            const res = await fetch(this.URL + "/inhabilitados", { headers: this.cabecera })
            const response = await res.json()

            return response;

        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Deyvi Ramos Panaifo
        fecha: 24/10/2022
        llamada a la api al CUS de Dar de baja Producto desde el Front-End al
        Back-End 
    */
    async descenderUsuario(id_usuario) {
        try {
            const res = await fetch(this.URL + '/inhabilitar/' + id_usuario, { method: 'PUT', headers: this.cabecera})
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
    async ascenderUsuario(id_usuario) {
        try {
            const res = await fetch(this.URL + '/habilitar/' + id_usuario, { method: 'PUT', headers: this.cabecera})
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Deyvi Ramos Panaifo
        fecha: 17/10/2022
        llamada a la api al CUS de registrar Producto desde el Front-End al
        Back-End 
    */
    async registrar(usuario) {
        try {
            const res = await fetch(this.URL+"/create" , { method: 'POST', headers: this.cabecera, body: JSON.stringify(usuario) })

            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Aldo Ramirez
        fecha: 17/10/2022
        llamada a la api del CUS de Editar Producto desde el Front-End al
        Back-End 
    */
    async modificar(usuario, id_usuario) {
        try {
            const res = await fetch(this.URL + '/update/' + id_usuario, {method: 'PUT', headers: this.cabecera, body: JSON.stringify(usuario)} )
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Gino Rubio Pacheco
        fecha: 24/10/2022
        llamada a la api del CUS de Editar Producto desde el Front-End al
        Back-End 
    */
    async buscar(id_usuario) {
        try {
            const res = await fetch(this.URL + '/read/' + id_usuario, { headers: this.cabecera })
            const response = await res.json()
            console.log("status usuario: "+response.status)
            return response
        } catch (error) {
            return error
        }
    }


}

