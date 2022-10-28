import store from '../store'

export class ServicioMovimientos {
    URL = "http://localhost:4000/api/tienda/movimientos"
    constructor() {
        this.cabecera = {
            'Content-Type': 'application/json',
            'x-access-token': `${store.state.token}`
        }
    }

    async mostrar() {
        try {
            //ruta para obtener información del back
            const res = await fetch(this.URL, { headers: this.cabecera })
            const response = await res.json()
            return response;

        } catch (error) {
            return error
        }
    }

    async eliminar(id) {
        try {
            const res = await fetch(this.URL + '/delete/' + id, {
                method: 'DELETE',
                headers: this.cabecera
            })
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }

    async registrar(movimiento) {
        try {
            const res = await fetch(this.URL + "/create", {
                method: 'POST',
                headers: this.cabecera,
                body: JSON.stringify(movimiento)
            })

            const response = await res.json()
            console.log(response)
            return response
        } catch (error) {
            return error
        }
    }

    async modificar(movimiento, id_movimiento) {
        try {
            const res = await fetch(this.URL + '/edit/' + id_movimiento, {
                method: 'PUT',
                headers: this.cabecera,
                body: JSON.stringify(movimiento)
            })
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }

    async buscar(cadena) {
        try {
            const res = await fetch(this.URL + 'buscar/' + cadena, {
                headers: this.cabecera,
            })
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }


}