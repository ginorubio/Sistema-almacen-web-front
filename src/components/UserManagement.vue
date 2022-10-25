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
                            <label for="nombre">Nombre</label>
                            <input v-if="modificar==3" disabled type="text" class="form-control" v-model="usuario.nombre" />
                            <input v-else type="text" class="form-control" v-model="usuario.nombre" />
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="dni">DNI</label>
                            <input v-if="modificar==3" disabled class="form-control" type="text" v-model="usuario.dni" />
                            <input v-else class="form-control" type="text" v-model="usuario.dni" />
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="contrasena">CONTRASEÑA</label>
                            <input v-if="modificar==3" disabled class="form-control" type="password" v-model="usuario.contrasena" />
                            <input v-else class="form-control" type="password" v-model="usuario.contrasena" />
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="contrasena">REPETIR CONTRASEÑA</label>
                            <input v-if="modificar==3" disabled class="form-control" type="password" v-model="usuario.recontrasena" />
                            <input v-else class="form-control" type="password" v-model="usuario.recontrasena" />
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="rol">ROL</label>
                            <select  v-if="modificar==3" disabled id="rol" name="rol" class="form-control" v-model="usuario.rol">
                                <option disabled selected value="">--Seleccione un rol--</option>
                                <option v-for="rol in roles">{{ rol }}</option>
                            </select>
                            <select v-else id="rol" name="rol" class="form-control" v-model="usuario.rol">
                                <option disabled selected value="">--Seleccione un rol--</option>
                                <option v-for="rol in roles">{{ rol }}</option>
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
            <template #thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DNI</th>
                    <th>ROL</th>
                    <th>ACCIONES</th>
                </tr>
            </template>

            <template #tbody>
                <tr v-for="usuario in usuariosPaginados" :key="usuario._id">
                    <td>{{ usuario._id }}</td>
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.dni }}</td>
                    <td>{{ usuario.rol }}</td>
                    <td>
                        <button @click="showModal = true; modificar = 3; abrirModal(usuario)" class="btn btn-info mr-2"><i
                                class="fa fa-eye"></i></button>
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
import { ServicioUsuario} from '../services/ServicesUsers.js'

export default {
    components: {
        ContentHeader, Content, Modal, DataTable
    },
    data() {
        return {
            usuarios: [],
            usuario: {
                nombre: '',
                dni: '',
                contrasena: '',
                recontrasena: '',
                rol: ''
            },
            showModal: false,
            id_usuario: 0,
            modificar: 0,
            tituloModal: '',
            usuariosPaginados: [],
            roles: ["Almacenero", "Jefe Almacenero"]
        }
    },
    methods: {
        setValues(obj){
            //retorno de la lista paginada
            this.usuariosPaginados = obj;
        },
        mostrarUsuarios() {
            //instancia del servicio
            const serviciousuario = new ServicioUsuario()

            serviciousuario.mostrar().then(data => {
                const response = data
                this.usuarios = response;
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
                text: `Se eliminará el usuario ${usuario.nombre}`,
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
                        if (response.mensaje == "eliminado") {
                            alertEliminar.fire(
                                'Eliminado!',
                                `El usuario ${usuario.nombre}.`,
                                'success'
                            )
                            this.mostrarProductos();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `El usuario ${usuario.nombre} no se pudo eliminar.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El usuario ${usuario.nombre} no se pudo eliminar.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El usuario ${usuario.nombre} no fue eliminado.`,
                        'error'
                    )
                }
            })
        },
        async guardar() {

            if (this.modificar == 2) {
                const serviciousuario = new ServicioUsuario()
                serviciousuario.modificar(this.producto, this.id_producto).then(data => {
                    const response = data
                    if (response.mensaje === "editado") {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Usuario Editado',
                            text: "Click en el botón para salir!",
                            showConfirmButton: true,
                            confirmButtonText: 'listo',
                            confirmButtonColor: 'btn btn-success',
                        })
                        this.mostrarProductos();
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
                serviciousuario.registrar(this.producto).then(data => {
                    const response = data
                    if (response.mensaje == "agregado") {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Usuario Registrado',
                            text: "Click en el botón para salir!",
                            showConfirmButton: true,
                            confirmButtonText: 'listo',
                            confirmButtonColor: 'btn btn-success',
                        })
                        this.mostrarProductos();
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
        },
        abrirModal(data = {}) {
            if (this.modificar == 2) {
                this.tituloModal = "Modificar Usuario"
                this.id_usuario = data._id;
                this.usuario.nombre = data.nombre;
                this.usuario.dni = data.dni;
                this.usuario.contrasena = data.contrasena;
                this.usuario.recontrasena = data.recontrasena;
                this.usuario.rol = data.rol;
            } else if(this.modificar == 1) {
                this.tituloModal = "Registrar Usuario"
                this.limpiarFormuralio();
            }else{
                this.tituloModal = "Detalle del Usuario"
                this.id_usuario = data._id;
                this.usuario.nombre = data.nombre;
                this.usuario.dni = data.dni;
                this.usuario.contrasena = data.contrasena;
                this.usuario.recontrasena = data.recontrasena;
                this.usuario.rol = data.rol;
            }
        },
        limpiarFormuralio() {
            this.usuario.nombre = '';
            this.usuario.dni = '';
            this.usuario.contrasena = '';
            this.usuario.recontrasena = '';
            this.usuario.rol = '';
        }
    },
    created() {
        this.mostrarUsuarios()
    }
}
</script>