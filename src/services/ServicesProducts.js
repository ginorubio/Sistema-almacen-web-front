import store from '../store'

export class ServicioProducto {
    //URI del back al cual pertenece este servicio
    URL = process.env.VUE_APP_SERVICE_URL+"/productos"
    constructor() {
        //cabecera de las peticiones Http
        this.cabecera = {
            'Content-Type': 'application/json',
            //token que se envia al Back
            'x-access-token': `${store.state.token}`
        }
    }
    /* 
        Autor: Deyvi Ramos Panaifo
        fecha: 15/11/2022
        llamada a la api al CUS de Listar Producto Habilitados desde el Front-End al
        Back-End 
    */
    async mostrar() {
        try {
            //ruta con el endpoint del back para listar los productos
            //devuelve la lista de productos
            const res = await fetch(this.URL, { headers: this.cabecera })
            const response = await res.json()
            return response;

        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Deyvi Ramos Panaifo
        fecha: 15/11/2022
        llamada a la api al CUS de Listar Producto con stock mínimo desde el Front-End al
        Back-End 
    */
    async mostrarStockMinimo() {
        try {

            const res = await fetch(this.URL + "/stockminimo", { headers: this.cabecera })
            const response = await res.json()
            return response;

        } catch (error) {
            return error
        }
    }
     /* 
        Autor: Aldo Ramirez
        fecha: 15/11/2022
        llamada a la api al CUS de Listar Producto InHabilitados desde el Front-End al
        Back-End 
    */
    async mostrarInhabilitados() {
        try {
            //ruta con el endpoint del back para listar los productos
            //devuelve la lista de productos inhabilitados
            const res = await fetch(this.URL + "/inhabilitados", { headers: this.cabecera })
            const response = await res.json()
            return response;

        } catch (error) {
            return error
        }
    }

    async eliminar(id_producto) {
        try {
            //ruta con el endpoint del back para eliminar producto
            //devuelve la lista de productos
            const res = await fetch(this.URL + '/' + id_producto, {
                method: 'DELETE',
                headers: this.cabecera
            })
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Deyvi Ramos Panaifo
        fecha: 07/11/2022
        llamada a la api al CUS de Dar de bajo Producto desde el Front-End al
        Back-End 
    */
    async descenderProducto(id_producto) {
        try {
            const res = await fetch(this.URL + '/inhabilitar/' + id_producto, { method: 'PUT', headers: this.cabecera })
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Gino Rubio Pacheco
        fecha: 15/11/2022
        llamada a la api al CUS de Dar de alta Producto desde el Front-End al
        Back-End 
    */
    async ascenderProducto(id_producto) {
        try {
            const res = await fetch(this.URL + '/habilitar/' + id_producto, { method: 'PUT', headers: this.cabecera })
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }

    /* 
        Autor: Gino Rubio Pacheco
        fecha: 08/11/2022
        llamada a la api del CUS de Registrar Producto desde el Front-End al
        Back-End 
    */
    async registrar(producto) {
        try {
            const res = await fetch(this.URL, {
                method: 'POST',
                headers: this.cabecera,
                body: JSON.stringify(producto)
            })

            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Gino Rubio Pacheco
        fecha: 09/11/2022
        llamada a la api del CUS de Editar Producto desde el Front-End al
        Back-End 
    */
    async modificar(producto, id_producto) {
        try {
            const res = await fetch(this.URL + '/' + id_producto, {
                method: 'PUT',
                headers: this.cabecera,
                body: JSON.stringify(producto)
            })
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }
    /* 
        Autor: Gino Rubio Pacheco
        fecha: 22/11/2022
        llamada a la api al CUS de Buscar Productos por código desde el Front-End al
        Back-End 
    */
    async buscar(codigo) {
        try {
            const res = await fetch(this.URL + '/read/' + codigo, { headers: this.cabecera })
            const response = await res.json()
            return response
        } catch (error) {
            console.log(error)
            return error
        }
    }


}

