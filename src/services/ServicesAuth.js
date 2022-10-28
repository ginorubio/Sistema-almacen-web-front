export class ServicioAuth {

    URL = "http://localhost:4000/api"

    constructor(){
        this.cabecera = {
            'Content-Type': 'application/json'
        }  
    }
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

