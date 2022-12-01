<template>
    <content-header title="AdmUsuarios" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button id="show-modal" type="button" @click.prevent="showModal = true, modificar = 1; abrirModal()"
            class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2" aria-hidden="true"></i> Nuevo Usuario
        </button>
        <div class="d-flex justify-content-end">
            <div>
                <div class="habilidados" :class="{ estadoactivo: activeUsuariosHabilitados }">
                    <button type="button" @click="activeUsuariosHabilitados = true; mostrarUsuarios()">
                        <i class="fas fa-circle mr-2" aria-hidden="true"></i> <strong>Habilitados</strong>
                    </button>
                </div>
                <div class="inhabilitados" :class="{ estadoinhabilitado: activeUsuarioInhabilitados }">
                    <button type="button" @click="activeUsuarioInhabilitados == true, mostrarUsuarioInhabilitados()">
                        <i class="fas fa-circle mr-2" aria-hidden="true"></i> <strong>Deshabilitados</strong>
                    </button>
                </div>
            </div>

        </div>

    </div>
    <teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false; v$.$reset()">
            <template #header>
                <h3>{{ tituloModal }}</h3>
            </template>
            <template #body>
                <div class="row">
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="nombre">NOMBRE</label>
                            <input v-if="modificar == 3" disabled type="text" class="form-control"
                                v-model="usuario.username" />
                            <input v-else type="text" class="form-control" v-model="usuario.username" />
                        </div>
                        <div class="text-danger" v-if="v$.usuario.username.$error">
                            {{ v$.usuario.username.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="dni">DNI</label>
                            <input v-if="modificar == 2" disabled class="form-control" type="text"
                                v-model="usuario.dni" />
                            <input v-else class="form-control" type="text" v-model="usuario.dni" />
                        </div>
                        <div class="text-danger" v-if="v$.usuario.dni.$error">
                            {{ v$.usuario.dni.$errors[0].$message }}
                        </div>
                    </div>


                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="email">CORREO</label>
                            <input v-if="modificar == 3" disabled class="form-control" type="email"
                                v-model="usuario.email" />
                            <input v-else class="form-control" type="email" v-model="usuario.email" />
                        </div>
                        <div class="text-danger" v-if="v$.usuario.email.$error">
                            {{ v$.usuario.email.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="contrasena">CONTRASEÑA</label>
                            <input v-if="modificar == 3" disabled class="form-control" type="password"
                                v-model="usuario.password" />
                            <input v-else class="form-control" type="password" v-model="usuario.password" />
                        </div>
                        <div class="text-danger" v-if="v$.usuario.password.$error">
                            {{ v$.usuario.password.$errors[0].$message }}
                        </div>
                    </div>

                    <div v-if="modificar != 3" class="col-12 mb-2">
                        <div class="form-group">
                            <label for="contrasena">REPETIR CONTRASEÑA</label>
                            <input class="form-control" type="password" v-model="usuario.repassword" />
                        </div>
                        <div class="text-danger" v-if="v$.usuario.repassword.$error">
                            {{ v$.usuario.repassword.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="rol">ROL</label>
                            <select v-if="modificar == 3" disabled id="rol" name="rol" class="form-control"
                                v-model="usuario.roles">
                                <option disabled selected value="">--Seleccione un rol--</option>
                                <option v-for="rol in data_roles">{{ rol.nombre }}</option>
                            </select>
                            <select v-else id="rol" name="rol" class="form-control" v-model="usuario.roles">
                                <option disabled selected value="">--Seleccione un rol--</option>
                                <option v-for="rol in data_roles">{{ rol.nombre }}</option>
                            </select>
                        </div>
                        <div class="text-danger" v-if="v$.usuario.roles.$error">
                            {{ v$.usuario.roles.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label v-if="modificar == 3" for="estado">ESTADO</label>
                            <select v-if="modificar == 3" disabled id="estado" name="estado" class="form-control"
                                v-model="usuario.estado">
                                <option disabled selected value="">--Seleccione un estado--</option>
                                <option v-for="estado in data_estado">{{ estado }}</option>
                            </select>
                        </div>
                    </div>

                </div>

            </template>
            <template #footer>
                <button v-if="modificar != 3" @click.prevent="guardar()" type="button" class="btn btn-success"
                    data-dismiss="modal">Guardar</button>

            </template>

        </modal>
    </teleport>
    <content>
        <data-table :lista="usuarios" @getValues="setValues">

            <template #button_buscar>
                <label class="mr-2" for="">BUSCAR:</label>
                <input class="rounded-pill" type="search" placeholder="Buscar por dni" v-model="cadena_buscar">
                <button class="btn btn-primary" @click="buscar(cadena_buscar)"><i class="fas fa-search"
                        aria-hidden="true"></i></button>

            </template>
            <template #thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">DNI</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">ROL</th>
                    <th scope="col">ACCIONES</th>
                </tr>
            </template>

            <template #tbody>
                <tr v-for="usuario in usuariosPaginados" :key="usuario._id">
                    <td>{{ usuario._id }}</td>
                    <td>{{ usuario.username }}</td>
                    <td>{{ usuario.dni }}</td>
                    <td>{{ usuario.email }}</td>
                    <td v-if="usuario.roles == '63636e8e8d3546d90542ad6a'">{{ data_roles[0].nombre }}</td>
                    <td v-else="usuario.roles == '63636e8e8d3546d90542ad67'">{{ data_roles[1].nombre }}</td>
                    <td v-else="usuario.roles == '63636e8e8d3546d90542ad69'">{{ data_roles[2].nombre }}</td>
                    <td>
                        <button v-if="false" @click="showModal = true; modificar = 3; abrirModal(usuario)"
                            class="btn btn-info mr-2"><i class="fa fa-eye" aria-hidden="true"></i></button>
                        <button v-if="usuario.estado != 'inhabilitado'" @click="showModal = true; modificar = 2; abrirModal(usuario)"
                            class="btn btn-success mr-2"><i class="far fa-edit" aria-hidden="true"></i></button>
                        <button v-if="false" type="button" @click="borrarUsuario(usuario)" class="btn btn-danger"><i
                                class="fa fa-eye-slash" aria-hidden="true"></i></button>
                        <button v-if="usuario.estado != 'habilitado'" type="button" @click="ascenderUsuario(usuario)" class="btn btn-primary mr-2"><i
                                class="fas fa-arrow-up" aria-hidden="true"></i></button>
                        <button v-if="usuario.estado != 'inhabilitado'" type="button" @click="descenderUsuario(usuario)" class="btn btn-danger "><i
                                class="fas fa-arrow-down" aria-hidden="true"></i></button>
                    </td>
                </tr>
            </template>
        </data-table>
    </content>
</template>
  
<script>
import ContentHeader from '@/components/ContentHeader.vue';
import Content from '@/components/Content.vue';
import Modal from '../components/Modal.vue';
import DataTable from '../components/DataTable.vue'
import { ServicioUsuario } from '../services/ServicesUsers.js'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers, maxLength } from '@vuelidate/validators'

//expresion que solo admite letras de a-z y A-Z, incluido los espacios
const caracterValido = helpers.regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
const numberValido = helpers.regex(/^\d+$/);

export default {
    components: {
        ContentHeader, Content, Modal, DataTable
    },
    setup: () => ({
        v$: useVuelidate()
    }),
    data() {
        return {
            usuarios: [],
            usuario: {
                username: '',
                email: '',
                dni: '',
                password: '',
                repassword: '',
                passwordNE: '',
                roles: '',
                estado: ''

            },
            data_estado: [
                "habilitado", "inhabilitado"
            ],
            activeUsuariosHabilitados: true,
            activeUsuarioInhabilitados: false,
            cadena_buscar: '',
            showModal: false,
            id_usuario: 0,
            modificar: 0,
            tituloModal: '',
            usuariosPaginados: [],
            data_roles: [
                { nombre: "almacenero", codigo: "63636e8e8d3546d90542ad6a" },
                { nombre: "admin", codigo: "63636e8e8d3546d90542ad67" },
                { nombre: "jefe_almacen", codigo: "63636e8e8d3546d90542ad69" },
            ],
        }
    },
    validations() {
        return {
            usuario: {
                //validaciones para el campo de username
                username: {
                    required: helpers.withMessage('El campo es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 3', minLength(3)),
                    caracteres: helpers.withMessage('Caracter no valido', caracterValido)
                },
                dni: {
                    required: helpers.withMessage('El campo es requerido', required),
                    numberValido: helpers.withMessage('Solo admite números', numberValido),
                    minLength: helpers.withMessage('El número de caracteres es 8', minLength(8)),
                    maxLength: helpers.withMessage('El número de caracteres es 8', maxLength(8)),

                },
                //validaciones para el campo de email
                email: {
                    required: helpers.withMessage('El campo es requerido', required),
                    email: helpers.withMessage('Correo incorrecto', email)
                },
                //validaciones para el campo de password
                password: {
                    required: helpers.withMessage('El campo es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 5', minLength(5))
                },
                //validaciones para el campo de repassword
                repassword: {
                    required: helpers.withMessage('El campo es requerido', required),
                    sameAsPassword: helpers.withMessage('Las contraseñas no coinciden', sameAs(this.usuario.password))
                },
                //validaciones para el campo de roles
                roles: {
                    required: helpers.withMessage('El rol es requerido', required),
                },

            }
        }
    },
    methods: {
        setValues(obj) {
            //retorno de la lista paginada
            this.usuariosPaginados = obj;
        },
        mostrarUsuarios() {
            this.activeUsuariosHabilitados = true;
            this.activeUsuarioInhabilitados = false;
            //instancia del servicio usuarios
            const serviciousuario = new ServicioUsuario()
            //se llama al metodo mostrar usuarios
            serviciousuario.mostrar().then(data => {
                const response = data

                console.log(response)
                if (response.status === 200) {
                    this.usuarios = response.data;
                } else {
                    console.log(error)
                }
            }, error => {
                console.log(error)
            })
        },
        mostrarUsuarioInhabilitados() {
            this.activeUsuariosHabilitados = false;
            this.activeUsuarioInhabilitados = true;
            //instancia del servicio usuarios
            const serviciousuario = new ServicioUsuario()
            //se llama al metodo mostrar usuarios inhabilitados
            serviciousuario.mostrarInhabilitados().then(data => {
                const response = data
                if (response.status === 200) {
                    this.usuarios = response.data;
                } else {
                    console.log(error)
                }
            }, error => {
                console.log(error)
            })
        },
        /* 
            Autor: Deyvi Ramos Panaifo
            fecha: 22/10/2022
            función relacionada al CUS de Dar de baja Usuario
        */
        descenderUsuario(usuario) {

            //Alert para eliminación
            const alertEliminar = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            alertEliminar.fire({
                title: '¿Está seguro de dar de baja?',
                text: `Se dará de baja al usuario ${usuario.username}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //instancia del servicio de usuarios
                    const serviciousuario = new ServicioUsuario()
                    //se llama al metodo eliminar usuarios
                    serviciousuario.descenderUsuario(usuario._id).then(data => {
                        const response = data
                        if (response.status === 200) {
                            alertEliminar.fire(
                                'Se dio de baja!',
                                `El usuario ${usuario.username} fue dado de baja.`,
                                'success'
                            )
                            this.mostrarUsuarios();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                ` ${usuario.username} no se pudo dar de baja.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El usuario ${usuario.username} no se pudo dar de baja.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El usuario ${usuario.username} no se pudo dar de baja.`,
                        'error'
                    )
                }
            })
        },
        ascenderUsuario(usuario) {

            //Alert para eliminación
            const alertEliminar = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            alertEliminar.fire({
                title: '¿Está seguro de dar de alta?',
                text: `Se dará de alta al usuario ${usuario.username}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //instancia del servicio de usuarios
                    const serviciousuario = new ServicioUsuario()
                    //se llama al metodo eliminar usuarios
                    serviciousuario.ascenderUsuario(usuario._id).then(data => {
                        const response = data
                        if (response.status === 200) {
                            alertEliminar.fire(
                                'Se dio de alta!',
                                `El usuario ${usuario.username} fue dado de alta.`,
                                'success'
                            )
                            this.mostrarUsuarios();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                ` ${usuario.username} no se pudo dar de alta.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El usuario ${usuario.username} no se pudo dar de alta.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El usuario ${usuario.username} no se pudo dar de alta.`,
                        'error'
                    )
                }
            })
        },
        guardar() {
            //se llama al validador
            this.v$.$validate();
            //verificamos las validaciones realizadas en los campos
            if (!this.v$.$error) {
                /* 
                    Autor: Aldo Ramirez
                    fecha: 15/10/2022
                    función relacionada al CUS de Editar Usuario
                */
                if (this.modificar == 2) {
                    //instancia del servicio de usuarios
                    const serviciousuario = new ServicioUsuario()
                    //el password digitado se guarda en una nueva variable
                    this.usuario.passwordNE = this.usuario.password
                    //se llama al metodo modificar usuarios
                    serviciousuario.modificar(this.usuario, this.id_usuario).then(data => {
                        const response = data

                        if (response.status === 200) {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Usuario Editado',
                                text: "Click en el botón para salir!",
                                showConfirmButton: true,
                                confirmButtonText: 'listo',
                                confirmButtonColor: 'btn btn-success',
                            })
                            this.mostrarUsuarios();
                            //se limpia el campo de la nueva contraseña
                            this.usuario.passwordNE = ""
                            //cerrar modal
                            //por definir
                        } else {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'No se pudo modificar!',
                            })
                        }
                    }, error => {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo modificar!',
                        })
                    })
                } else {
                    /* 
                        Autor: Deyvi Ramos Panaifo
                        fecha: 15/10/2022
                        función relacionada al CUS de Registrar Usuario
                    */
                    //instancia del servicio de usuarios
                    const serviciousuario = new ServicioUsuario()
                    //se llama al metodo registrar usuarios
                    serviciousuario.registrar(this.usuario).then(data => {
                        const response = data
                        if (response.status === 200) {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Usuario Registrado',
                                text: "Click en el botón para salir!",
                                showConfirmButton: true,
                                confirmButtonText: 'listo',
                                confirmButtonColor: 'btn btn-success',
                            })
                            this.mostrarUsuarios();
                            this.limpiarFormuralio();
                        } else {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'No se pudo registrar!',
                            })
                        }
                    }, error => {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo registrar!',
                        })
                    })
                }
            } else {
                this.usuario.error = true;
            }

        },
        abrirModal(data = {}) {
            if (this.modificar == 2) {
                this.tituloModal = "Modificar Usuario"
                this.id_usuario = data._id;
                this.usuario.username = data.username;
                this.usuario.dni = data.dni;
                this.usuario.email = data.email;
                this.usuario.password = data.password;
                this.usuario.repassword = data.repassword;
                this.usuario.estado = data.estado;
                const index = this.data_roles.findIndex(x => x.codigo == data.roles);
                console.log(index)
                this.usuario.roles = this.data_roles[index].nombre;
            } else if (this.modificar == 1) {
                this.tituloModal = "Registrar Usuario"
                this.limpiarFormuralio();
            } else {
                this.tituloModal = "Detalle del Usuario"
                this.id_usuario = data._id;
                this.usuario.username = data.username;
                this.usuario.username = data.dni;
                this.usuario.email = data.email;
                this.usuario.password = data.password;
                this.usuario.estado = data.estado;
                //se buscara en la lista de data_roles el rol que pertenece al usuario con el rol de data.roles.name
                //se encontrara el index o posicion
                const index = this.data_roles.findIndex(x => x == data.roles.name);
                //se asigna el nombre del rol encontrado en la variable this.usuario.roles
                this.usuario.roles = this.data_roles[index];
            }
        },
        limpiarFormuralio() {
            this.usuario.username = '';
            this.usuario.dni = '';
            this.usuario.email = '';
            this.usuario.password = '';
            this.usuario.repassword = '';
            this.usuario.roles = '';
        },
        /* 
            Autor: Gino Rubio Pacheco
            fecha: 23/10/2022
            función relacionada al CUS de Buscar Usuario por dni
        */
        buscar(dni) {
            if (dni) {
                let usuario = []
                //instancia del servicio de usuarios
                const serviciousuario = new ServicioUsuario()
                //se llama al metodo buscar usuarios
                serviciousuario.buscar(dni).then(data => {
                    const response = data
                    if (response.status === 200) {
                        usuario[0] = response.data
                        this.usuarios = usuario
                    } else {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo encontrar al usuario!',
                        })
                    }
                }, error => {
                    this.mostrarUsuarios()
                })
            } else {
                this.mostrarUsuarios()
            }
        }
    },
    created() {
        this.mostrarUsuarios()
    }
}
</script>
<style>
.habilidados button {
    border: none;
}

.inhabilitados button {
    border: none;
}

.inhabilitados button i {
    color: rgb(211, 22, 22);
}

.habilidados button i {
    color: green;
}

.habilidados button:focus,
.inhabilitados button:focus {
    border: none;
    outline: none !important;
}

.habilidados button strong,
.inhabilidados button strong {
    padding-right: 4px;
    padding-left: 4px;
}

.estadoactivo button strong {
    background: green;
    color: #fff;

}

.estadoactivo i {
    color: green;
}

.estadoinhabilitado button strong {
    background: rgb(211, 22, 22);
    color: #fff;

}

.estadoinhabilitado i {
    color: rgb(211, 22, 22);
}
</style>