import store from '../store'

export class ServicioCategorias {
    URL = "http://localhost:4000/api/categoria"
    constructor(){
        this.cabecera = {
            'Content-Type': 'application/json',
            'x-access-token': `${store.state.token}`
        }  
    }
    
    async mostrar() {
        try {
            //ruta para obtener información del back
            const res = await fetch(this.URL+"/read", {headers: this.cabecera})
            const response = await res.json()

            return response;

        } catch (error) {
            return error
        }
    }

    async mostrarInhabilitados() {
        try {
            //ruta para obtener información del back
            const res = await fetch(this.URL+"/inhabilitados", {headers: this.cabecera})
            const response = await res.json()

            return response;

        } catch (error) {
            return error
        }
    }
    
    async descenderCategoria(id_categoria) {
        try {
            const res = await fetch(this.URL + '/inhabilitar/' + id_categoria, { method: 'PUT', headers: this.cabecera})
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
    async ascenderCategoria(id_categoria) {
        try {
            const res = await fetch(this.URL + '/habilitar/' + id_categoria, { method: 'PUT', headers: this.cabecera})
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }

    async  registrar(categoria) {
        try {
            const res = await fetch(this.URL+"/create", { method: 'POST', headers: this.cabecera, body: JSON.stringify(categoria)} )
            
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }

    async  modificar(categoria,id_categoria) {
        try {
            const res = await fetch(this.URL+'/update/'+ id_categoria, { method: 'PUT', headers: this.cabecera, body: JSON.stringify(categoria)})
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }
    

    async buscar(nombre){
        try {
            const res = await fetch(this.URL+'/read/byname/'+nombre,{headers: this.cabecera})
            const response = await res.json()
            return response
        } catch (error) {
            return error
        }
    }
    

}