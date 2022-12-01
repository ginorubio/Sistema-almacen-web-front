import store from '../store'

export class ServicioMovimientos {
    URL = "http://localhost:4000/api/movimiento"
    constructor() {
        this.cabecera = {
            'Content-Type': 'application/json',
            'x-access-token': `${store.state.token}`
        }
    }

    async mostrar() {
        try {
            //ruta para obtener información del back
            const res = await fetch(this.URL+'/read', { headers: this.cabecera })
            const response = await res.json()
            return response;

        } catch (error) {
            return error
        }
    }

    async eliminar(id_movimiento) {
        try {
            const res = await fetch(this.URL + '/delete/' + id_movimiento, { method: 'DELETE', headers: this.cabecera })
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Gino Rubio Pacheco
        fecha: /11/2022
        llamada a la api al CUS de Resgistrar movimiento desde el Front-End al
        Back-End 
    */
    async registrar(movimiento) {
        try {
            const res = await fetch(this.URL + "/create", { method: 'POST', headers: this.cabecera, body: JSON.stringify(movimiento)})

            const response = await res.json()
            console.log(response)
            return response
        } catch (error) {
            return error
        }
    }

    async modificar(movimiento, id_movimiento) {
        try {
            const res = await fetch(this.URL + '/update/' + id_movimiento, { method: 'PUT', headers: this.cabecera, body: JSON.stringify(movimiento)})
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }

    async buscar(nombre_movimiento) {
        try {
            const res = await fetch(this.URL + '/read/' + nombre_movimiento, { headers: this.cabecera})
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }


}