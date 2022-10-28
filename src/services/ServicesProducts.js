import store from '../store'

export class ServicioProducto {
    URL = "http://localhost:4000/api/productos"
    constructor(){
        this.cabecera = {
            'Content-Type': 'application/json',
            'x-access-token': `${store.state.token}`
        }  
    }
    
    async mostrar() {
        try {
            //ruta para obtener información del back
            const res = await fetch(this.URL, {headers: this.cabecera})
            const response = await res.json()
            return response;

        } catch (error) {
            return error
        }
    }
    
    async  eliminar(id) {
        try {
            const res = await fetch(this.URL + '/' + id, {
                method: 'DELETE',
                headers: this.cabecera
            })
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
            console.log(response)
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

    async buscar(_id){
        try {
            const res = await fetch(this.URL+'/'+_id,{headers: this.cabecera})
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }
    

}

