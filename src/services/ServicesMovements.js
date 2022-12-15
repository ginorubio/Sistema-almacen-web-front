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
            const res = await fetch(this.URL+'/aprobados', { headers: this.cabecera })
            const response = await res.json()
            return response;
        } catch (error) {
            return error
        }
    }
    async mostrarAnulados() {
        try {
            //ruta para obtener información del back
            const res = await fetch(this.URL+'/anulados', { headers: this.cabecera })
            const response = await res.json()
            return response;
        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Gino Rubio Pacheco
        fecha: 06/11/2022
        llamada a la api al CUS de anular o eliminar movimiento desde el Front-End al
        Back-End 
    */
    async eliminar(codigo_movimiento) {
        try {
            const res = await fetch(this.URL + '/anular_mov/' + codigo_movimiento, { method: 'PUT', headers: this.cabecera })
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Gino Rubio Pacheco
        fecha: 28/11/2022
        llamada a la api al CUS de Resgistrar movimiento desde el Front-End al
        Back-End 
    */
    async registrar(movimiento) {
        try {
            const res = await fetch(this.URL + "/create", { method: 'POST', headers: this.cabecera, body: JSON.stringify(movimiento)})

            const response = await res.json()
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
    /* 
        Autor: Gino Rubio Pacheco
        fecha: 06/11/2022
        llamada a la api al CUS de buscar movimiento desde el Front-End al
        Back-End 
    */
    async buscar(codigo_movimiento) {
        try {
            const res = await fetch(this.URL + '/searchByCode/' + codigo_movimiento, { headers: this.cabecera})
            const response = await res.json()
            console.log(response)
            return response
        } catch (error) {
            return error
        }
    }


}