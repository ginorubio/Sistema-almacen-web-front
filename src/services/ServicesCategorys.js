import store from '../store'

export class ServicioCategorias {
    URL = process.env.VUE_APP_SERVICE_URL+"/categoria";
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
    /* 
        Autor: Aldo Ramirez
        fecha: 24/10/2022
        llamada a la api del CUS de Registar Categoria desde el Front-End al
        Back-End 
    */
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
    
    /* 
        Autor: Aldo Ramirez
        fecha: 31/10/2022
        llamada a la api del CUS de Buscar Categoria por nombre desde el Front-End al
        Back-End 
    */
    async buscar(nombre){
        try {
            const res = await fetch(this.URL+'/read/byname/'+nombre,{headers: this.cabecera})
            const response = await res.json()
            console.log(response)
            return response
        } catch (error) {
            return error
        }
    }
    

}