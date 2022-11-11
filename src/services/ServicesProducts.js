import store from '../store'

export class ServicioProducto {
    //URI del back al cual pertenece este servicio
    URL = "http://localhost:4000/api/productos"
    constructor(){
        //cabecera de las peticiones Http
        this.cabecera = {
            'Content-Type': 'application/json',
            //token que se envia al Back
            'x-access-token': `${store.state.token}`
        }  
    }
    
    async mostrar() {
        try {
            //ruta con el endpoint del back para listar los productos
            //devuelve la lista de productos
            const res = await fetch(this.URL, {headers: this.cabecera})
            const response = await res.json()
            return response;

        } catch (error) {
            return error
        }
    }

    async mostrarInhabilitados() {
        try {
            //ruta con el endpoint del back para listar los productos
            //devuelve la lista de productos inhabilitados
            const res = await fetch(this.URL+ "/inhabilitados", {headers: this.cabecera})
            const response = await res.json()
            return response;

        } catch (error) {
            return error
        }
    }
    
    async  eliminar(id_producto) {
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
    async descenderProducto(id_producto) {
        try {
            const res = await fetch(this.URL + '/inhabilitar/' + id_producto, { method: 'PUT', headers: this.cabecera})
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
    async ascenderProducto(id_producto) {
        try {
            const res = await fetch(this.URL + '/habilitar/' + id_producto, { method: 'PUT', headers: this.cabecera})
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }


    async  registrar(producto) {
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

    async  modificar(producto,id_producto) {
        try {
            const res = await fetch(this.URL+'/'+ id_producto, {
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

    async buscar(id_producto){
        try {
            const res = await fetch(this.URL+'/'+id_producto,{headers: this.cabecera})
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }
    

}

