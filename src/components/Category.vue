<template>
    <content-header title="Categorias" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button v-if="$store.state.rol == 'jefe_almacen'" id="show-modal" type="button" @click.prevent="showModal = true, modificar = false; abrirModal()"
            class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2" aria-hidden="true"></i> Nueva Categoría
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
                            <label>Código</label>
                            <input type="text" class="form-control" v-model="categoria.codigo">
                        </div>
                        <div class="text-danger" v-if="v$.categoria.codigo.$error">
                            {{ v$.categoria.codigo.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <textarea class="form-control" id="nombre" v-model="categoria.nombre"
                                style="height: 100px"></textarea>
                        </div>
                        <div class="text-danger" v-if="v$.categoria.nombre.$error">
                            {{ v$.categoria.nombre.$errors[0].$message }}
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click.prevent="guardar()" type="button" class="btn btn-success"
                    >Guardar</button>
            </template>
        </modal>
    </teleport>
    <content>
        <data-table :lista="categorias" @getValues="setValues">
            
            <template #button_buscar>
                <label class="mr-2" for="">BUSCAR:</label>
                <input class="rounded-pill" type="search" v-model="cadena_buscar">
                <button class="btn btn-primary" @click="buscar(cadena_buscar)"><i class="fas fa-search" aria-hidden="true"></i></button>
            </template>
            <template #thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">CÓDIGO</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col" v-if="$store.state.rol == 'jefe_almacen'">ACCIONES</th>
                </tr>
            </template>

            <template #tbody>
                <tr v-for="categoria in categoriasPaginadas" :key="categoria._id">
                    <td>{{ categoria._id }}</td>
                    <td>{{ categoria.codigo }}</td>
                    <td>{{ categoria.nombre }}</td>
                    <td>
                        <button v-if="$store.state.rol == 'jefe_almacen'" @click="showModal = true; modificar = true; abrirModal(categoria)"
                            class="btn btn-success mr-2"><i class="far fa-edit" aria-hidden="true"></i></button>
                        <button v-if="$store.state.rol == 'jefe_almacen'"  type="button" @click="borrarCategoria(categoria)" class="btn btn-danger "><i
                                class="fas fa-trash" aria-hidden="true"></i></button>
                    </td>
                </tr>
            </template>
        </data-table>
    </content>
</template>
  
<script>
import ContentHeader from '@/components/ContentHeader.vue';
import Content from '@/components/Content.vue';
import Modal from '../components/Modal.vue'
import DataTable from './DataTable.vue';
import { ServicioCategorias } from '../services/ServicesCategorys'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers,minLength, maxLength } from '@vuelidate/validators'

const caracterValido = helpers.regex(/^[a-zA-Z]+(\s?[a-zA-Z]*)*[a-zA-Z]+$/);
const numberValido = helpers.regex(/^\d+$/);

export default {
    components: {
        ContentHeader, Content, Modal, DataTable
    },
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            categorias: [],
            categoria: {
                codigo: '',
                nombre: ''
            },
            showModal: false,
            id_categoria: 0,
            modificar: true,
            categoriasPaginadas: [],
            tituloModal: '',
            cadena_buscar: ''
        }
    },
    validations() {
        return {
            categoria: {
                codigo: { 
                    required: helpers.withMessage('El campo es requerido', required),
                    number: helpers.withMessage('Solo admite números ', numberValido),
                    maxLength: helpers.withMessage('El máximo número de dígitos es 3', maxLength(3))
                 },
                 nombre: { required: helpers.withMessage('El campo es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 3', minLength(3)),
                    caracteres: helpers.withMessage('Caracter no valido', caracterValido),
                    maxLength: helpers.withMessage('El máximo número de caracteres es 50', maxLength(25))
                }
            }
        }
    },
    methods: {
        setValues(obj) {
            //retorno de la lista paginada
            this.categoriasPaginadas = obj;
        },
        mostrarCategorias() {
            //instancia del servicio
            const serviciocategorias = new ServicioCategorias()

            serviciocategorias.mostrar().then(data => {
                const response = data

                console.log(response)
                this.categorias = response.data;
            }, error => {
                console.log(error)
            })
        },
        borrarCategoria(categoria) {

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
                text: `Se eliminará la categoría ${categoria.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, Eliminar!',
                cancelButtonText: 'No, Cancelar!',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //peticion al servicio
                    const serviciocategorias = new ServicioCategorias()
                    serviciocategorias.eliminar(categoria._id).then(data => {
                        const response = data
                        if (response.status == 200) {
                            alertEliminar.fire(
                                'Eliminado!',
                                `La categoría ${categoria.nombre}.`,
                                'success'
                            )
                            this.mostrarCategorias();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `La categoría ${categoria.nombre} no se pudo eliminar.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `La categoría ${categoria.nombre} no se pudo eliminar.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `La categoría ${categoria.nombre} no fue eliminado.`,
                        'error'
                    )
                }
            })
        },
        guardar() {

            this.v$.$validate();
            if (!this.v$.$error) {
                if (this.modificar) {
                    const serviciocategorias = new ServicioCategorias()
                    serviciocategorias.modificar(this.categoria, this.id_categoria).then(data => {
                        const response = data
                        if (response.status === 200) {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Categoría Editada',
                                text: "Click en el botón para salir!",
                                showConfirmButton: true,
                                confirmButtonText: 'listo',
                                confirmButtonColor: 'btn btn-success',
                            })
                            this.mostrarCategorias();
                            //cerrar modal
                            //por definir
                        } else {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'No se pudo modificar!',
                                text: `${response.message}`,
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
                    const serviciocategorias = new ServicioCategorias()
                    serviciocategorias.registrar(this.categoria).then(data => {
                        const response = data
                        console.log(response)
                        if (response.status === 201) {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Categoría Registrada',
                                text: "Click en el botón para salir!",
                                showConfirmButton: true,
                                confirmButtonText: 'listo',
                                confirmButtonColor: 'btn btn-success',
                            })
                            this.mostrarCategorias();
                            this.limpiarFormuralio();
                        } else {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `${response.message}`,
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
                this.categoria.error = true;
            }

        },
        abrirModal(data = {}) {
            if (this.modificar) {
                this.tituloModal = "Modificar Categoria"
                this.id_categoria = data._id;
                this.categoria.codigo = data.codigo;
                this.categoria.nombre = data.nombre;
            } else {
                this.tituloModal = "Registrar Categoria"
                this.limpiarFormuralio();
            }
        },
        limpiarFormuralio() {
            this.categoria.nombre = '';
            this.categoria.codigo = '';
        },
        buscar(nombre) {
            if (nombre) {
                const serviciocategoria = new ServicioCategorias()
                serviciocategoria.buscar(nombre).then(data => {
                    const response = data
                    console.log(response)
                    if (response.status === 200) {
                        this.categorias = response.data
                    } else {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo encontrar la categoría!',
                        })
                    }
                }, error => {
                    this.mostrarCategorias()
                })
            } else {
                this.mostrarCategorias()
            }
        }
    },
    created() {
        this.mostrarCategorias()
    }
}
</script>