<template>
    <content-header title="Categorias" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button id="show-modal" type="button" @click.prevent="showModal = true, modificar = false; abrirModal()"
            class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2"></i> Nueva Categoría
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
                            <label>Nombre</label>
                            <input type="text" class="form-control" v-model="categoria.nombre">
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="descripcion">Descricion</label>
                            <textarea class="form-control" id="descripcion" v-model="categoria.descripcion"
                                style="heigt: 100px"></textarea>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click.prevent="guardar()" type="button" class="btn btn-success"
                    data-dismiss="modal">Guardar</button>
            </template>
        </modal>
    </teleport>
    <content>
        <data-table :lista="categorias" @getValues="setValues">
            <template #thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DESCRIPCON</th>
                    <th>ACCIONES</th>
                </tr>
            </template>

            <template #tbody>
                <tr v-for="categoria in categoriasPaginadas" :key="categoria._id">
                    <td>{{ categoria._id }}</td>
                    <td>{{ categoria.nombre }}</td>
                    <td>{{ categoria.descripcion }}</td>
                    <td>
                        <button @click="showModal = true; modificar = true; abrirModal(categoria)"
                            class="btn btn-success mr-2"><i class="far fa-edit"></i></button>
                        <button type="button" @click="borrarCategoria(categoria)" class="btn btn-danger "><i
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
import Modal from '../components/Modal.vue'
import DataTable from './DataTable.vue';
import { ServicioCategorias } from '../services/ServicesCategorys'

export default {
    components: {
        ContentHeader, Content, Modal, DataTable
    },
    data() {
        return {
            categorias: [],
            categoria: {
                nombre: '',
                descripcion: ''
            },
            showModal: false,
            id_categoria: 0,
            modificar: true,
            categoriasPaginadas: [],
            tituloModal: '',
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
                this.categorias = response;
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
                        if (response.mensaje == "eliminado") {
                            alertEliminar.fire(
                                'Eliminado!',
                                `La categoría ${categoria.nombre}.`,
                                'success'
                            )
                            this.mostrarProductos();
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
        async guardar() {

            if (this.modificar) {
                const serviciocategorias = new ServicioCategorias()
                serviciocategorias.modificar(this.categoria, this.id_categoria).then(data => {
                    const response = data
                    if (response.mensaje === "editado") {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Categoría Editada',
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
                const serviciocategorias = new ServicioCategorias()
                serviciocategorias.registrar(this.categoria).then(data => {
                    const response = data
                    if (response.mensaje == "agregado") {
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
            if (this.modificar) {
                this.tituloModal = "Modificar Categoria"
                this.id_categoria = data._id;
                this.categoria.nombre = data.nombre;
                this.categoria.descripcion = data.descripcion;
            } else {
                this.tituloModal = "Registrar Categoria"
                this.limpiarFormuralio();
            }
        },
        limpiarFormuralio() {
            this.categoria.descripcion = '';
            this.categoria.nombre = '';
        }
    },
    created() {
        this.mostrarCategorias()
    }
}
</script>