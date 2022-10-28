<template>
    <content-header title="Gestión de Usuarios" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button id="show-modal" type="button" @click.prevent="showModal = true, modificar = 1; abrirModal()"
            class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2"></i> Nuevo Usuario
        </button>
    </div>
    <teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false">
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

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="contrasena">REPETIR CONTRASEÑA</label>
                            <input v-if="modificar == 3" disabled class="form-control" type="password"
                                v-model="usuario.repassword" />
                            <input v-else class="form-control" type="password" v-model="usuario.repassword" />
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
                                <option v-for="rol in data_roles">{{ rol }}</option>
                            </select>
                            <select v-else id="rol" name="rol" class="form-control" v-model="usuario.roles">
                                <option disabled selected value="">--Seleccione un rol--</option>
                                <option v-for="rol in data_roles">{{ rol }}</option>
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
                <input class="rounded-pill" type="search" v-model="cadena_buscar">
                <button class="btn btn-primary" @click="buscar(cadena_buscar)"><i class="fas fa-search"></i></button>
            </template>
            <template #thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>EMAIL</th>
                    <th>ROL</th>
                    <th>ACCIONES</th>
                </tr>
            </template>

            <template #tbody>
                <tr v-for="usuario in usuariosPaginados" :key="usuario._id">
                    <td>{{ usuario._id }}</td>
                    <td>{{ usuario.username }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.roles }}</td>
                    <td>
                        <button @click="showModal = true; modificar = 3; abrirModal(usuario)"
                            class="btn btn-info mr-2"><i class="fa fa-eye"></i></button>
                        <button @click="showModal = true; modificar = 2; abrirModal(usuario)"
                            class="btn btn-success mr-2"><i class="far fa-edit"></i></button>
                        <button type="button" @click="borrarUsuario(usuario)" class="btn btn-danger "><i
                                class="fas fa-trash"></i></button>
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
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'

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
                password: '',
                repassword: '',
                passwordNE: '',
                roles: ''

            },
            cadena_buscar: '',
            showModal: false,
            id_usuario: 0,
            modificar: 0,
            tituloModal: '',
            usuariosPaginados: [],
            data_roles: ["almacenero", "admin", "jefe_almacen", "user"],
        }
    },
    validations() {
        return {
            usuario: {
                username: { required: helpers.withMessage('El valor es requerido', required) },
                email: {
                    required: helpers.withMessage('El valor es requerido', required),
                    email: helpers.withMessage('Correo incorrecto', email)
                },
                password: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 5', minLength(5))
                },
                repassword: {
                    required: helpers.withMessage('El valor es requerido', required),
                    sameAsPassword: helpers.withMessage('Las contraseñas no coinciden', sameAs(this.usuario.password))
                }
            }
        }
    },
    methods: {
        setValues(obj) {
            //retorno de la lista paginada
            this.usuariosPaginados = obj;
        },
        mostrarUsuarios() {
            //instancia del servicio
            const serviciousuario = new ServicioUsuario()
            serviciousuario.mostrar().then(res => {
                const response = res
                this.usuarios = response.data;
            }, error => {
                console.log(error)
            })
        },
        borrarUsuario(usuario) {

            //Alert para eliminación
            const alertEliminar = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            alertEliminar.fire({
                title: 'Desea Eliminar?',
                text: `Se eliminará el usuario ${usuario.username}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, Eliminar!',
                cancelButtonText: 'No, Cancelar!',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //peticion al servicio
                    const serviciousuario = new ServicioUsuario()
                    serviciousuario.eliminar(usuario._id).then(data => {
                        const response = data
                        if (response.status === 200) {
                            alertEliminar.fire(
                                'Eliminado!',
                                `El usuario ${usuario.username}.`,
                                'success'
                            )
                            this.mostrarUsuarios();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `El usuario ${usuario.username} no se pudo eliminar.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El usuario ${usuario.username} no se pudo eliminar.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El usuario ${usuario.username} no fue eliminado.`,
                        'error'
                    )
                }
            })
        },
        guardar() {

            this.v$.$validate();
            if (!this.v$.$error) {
                if (this.modificar == 2) {
                    const serviciousuario = new ServicioUsuario()
                    this.usuario.passwordNE = this.usuario.password
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
                    const serviciousuario = new ServicioUsuario()
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
                console.log("no se pudo guardar")
                this.usuario.error = true;
            }

        },
        abrirModal(data = {}) {
            if (this.modificar == 2) {
                this.tituloModal = "Modificar Usuario"
                this.id_usuario = data._id;
                this.usuario.username = data.username;
                this.usuario.email = data.email;
                this.usuario.password = data.password;
                this.usuario.repassword = data.repassword;
                this.usuario.roles = data.roles;
            } else if (this.modificar == 1) {
                this.tituloModal = "Registrar Usuario"
                this.limpiarFormuralio();
            } else {
                this.tituloModal = "Detalle del Usuario"
                this.id_usuario = data._id;
                this.usuario.username = data.username;
                this.usuario.email = data.email;
                this.usuario.password = data.password;
                this.usuario.repassword = data.repassword;
                this.usuario.roles = data.roles;
            }
        },
        limpiarFormuralio() {
            this.usuario.username = '';
            this.usuario.email = '';
            this.usuario.password = '';
            this.usuario.repassword = '';
            this.usuario.roles = '';
        },
        buscar(id) {
            if (id) {
                let usuario = []
                const serviciousuario = new ServicioUsuario()
                serviciousuario.buscar(id).then(data => {
                    const response = data

                    if (response.status === 200) {
                        usuario[0] = response.data
                        this.usuarios = usuario
                    } else {
                        this.mostrarUsuarios()
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