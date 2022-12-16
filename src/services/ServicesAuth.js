export class ServicioAuth {

    URL = "http://localhost:4000/api"

    constructor(){
        this.cabecera = {
            'Content-Type': 'application/json'
        }  
    }
    /* 
        Autor: Gino Rubio Pacheco
        fecha: 17/10/2022
        llamada a la api al CUS de Dar de alta Producto desde el Front-End al
        Back-End 
    */
    async  login(usuario) {
        try {
            const res = await fetch(this.URL + '/auth/signIn', {
                method: 'POST',
                headers: this.cabecera,
                body: JSON.stringify(usuario)
            })
            const response = await res.json()
            return response

        } catch (error) {
            return error
        }
    }
}

