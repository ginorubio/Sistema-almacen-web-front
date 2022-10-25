<template>
    <content-header title="Productos" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button id="show-modal" @click.prevent="showModal=true; modificar=1; abrirModal()" type="button"
            class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2"></i> Nuevo Producto
        </button>
    </div>
    <teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false">
            <template #header>
                <h3>{{tituloModal}}</h3>
            </template>
            <template #body>

                <div class="row">
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="codigo">Código</label>
                            <input v-if="modificar==3" disabled class="form-control" id="codigo"
                                v-model="producto.codigo" />
                            <input v-else class="form-control" id="codigo" v-model="producto.codigo" />
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input v-if="modificar==3" disabled class="form-control" id="nombre"
                                v-model="producto.nombre" />
                            <input v-else class="form-control" id="nombre" v-model="producto.nombre" />
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="descripcion">Descripcion</label>
                            <textarea v-if="modificar==3" disabled class="form-control" id="descripcion"
                                v-model="producto.descripcion" style="heigt: 100px"></textarea>
                            <textarea v-else class="form-control" id="descripcion" v-model="producto.descripcion"
                                style="heigt: 100px"></textarea>

                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Precio</label>
                            <input v-if="modificar==3" disabled type="number" class="form-control"
                                v-model="producto.precio">
                            <input v-else type="number" class="form-control" v-model="producto.precio">
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Stock</label>
                            <input v-if="modificar==3" disabled type="number" class="form-control"
                                v-model="producto.stock">
                            <input v-else type="number" class="form-control" v-model="producto.stock">
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Costo</label>
                            <input v-if="modificar==3" disabled type="number" class="form-control"
                                v-model="producto.costo">
                            <input v-else type="number" class="form-control" v-model="producto.costo">
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Categoría</label>
                            <input v-if="modificar==3" disabled type="text" class="form-control"
                                v-model="producto.categoria">
                            <input v-else type="text" class="form-control" v-model="producto.categoria">
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Unidad de medida</label>
                            <input v-if="modificar==3" disabled type="text" class="form-control"
                                v-model="producto.unidadMedida">
                            <input v-else type="text" class="form-control" v-model="producto.unidadMedida">
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
        <data-table :lista="productos" @getValues="setValues">
            <template #thead>
                <tr>
                    <th>ID</th>
                    <th>nombre</th>
                    <th>DESCRIPCION</th>
                    <th>PRECIO</th>
                    <th>STOCK</th>
                    <th>ACCIONES</th>
                </tr>
            </template>

            <template #tbody >
                <tr v-for="producto in productosPaginados" :key="producto._id">
                    <td>{{producto._id}}</td>
                    <td>{{producto.nombre}}</td>
                    <td>{{producto.descripcion}}</td>
                    <td>{{producto.precio}}</td>
                    <td>{{producto.stock}}</td>
                    <td>
                        <button @click="showModal=true; modificar=3; abrirModal(producto)" class="btn btn-info mr-2"><i
                                class="fa fa-eye"></i></button>
                        <button @click="showModal=true; modificar=2; abrirModal(producto)"
                            class="btn btn-success mr-2"><i class="far fa-edit"></i></button>
                        <button type="button" @click="borrarProductos(producto)" class="btn btn-danger "><i
                                class="fas fa-trash"></i></button>
                    </td>
                </tr>
            </template>
        </data-table>
    </content>
</template>
<script>
import ContentHeader from '../components/ContentHeader.vue'
import Content from '../components/Content.vue'
import Modal from '../components/Modal.vue'
import { ServicioProducto } from '../services/ServicesProducts';
import DataTable from '../components/DataTable.vue'

export default {
    name: "productos",
    components: {
        ContentHeader,
        Content,
        Modal,
        DataTable,
    },
    data() {
        return {
            producto: {
                descripcion: "",
                precio: "",
                categoria: "",
                unidadMedida: "",
                nombre: "",
                codigo: "",
                stock: "",
                costo: ""
            },
            showModal: false,
            id_producto: 0,
            modificar: 0,
            tituloModal: '',
            productos: [],
            productosPaginados: [],
        }
    },
    created() {
        this.mostrarProductos()
        
    }, 
    methods: {
        setValues(obj){
            //retorno de la lista paginada
            this.productosPaginados = obj;
        },
        mostrarProductos() {
            //instancia del servicio
            const servicioproducto = new ServicioProducto()

            servicioproducto.mostrar().then(data => {
                const response = data
                this.productos = response;
            }, error => {
                console.log(error)
            })
        },
        borrarProductos(producto) {

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
                text: `Se eliminará el producto ${producto.descripcion}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, Eliminar esto!',
                cancelButtonText: 'No, Cancelar!',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //peticion al servicio
                    const servicioproducto = new ServicioProducto()
                    servicioproducto.eliminar(producto._id).then(data => {
                        const response = data
                        if (response.mensaje == "eliminado") {
                            alertEliminar.fire(
                                'Eliminado!',
                                `El producto ${producto.descripcion}.`,
                                'success'
                            )
                            this.mostrarProductos();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `El producto ${producto.descripcion} no se pudo eliminar.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El producto ${producto.descripcion} no se pudo eliminar.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El producto ${producto.descripcion} no fue eliminado.`,
                        'error'
                    )
                }
            })
        },
        async guardar() {

            if (this.modificar == 2) {
                const servicioproducto = new ServicioProducto()
                servicioproducto.modificar(this.producto, this.id_producto).then(data => {
                    const response = data
                    if (response.mensaje === "editado") {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Producto Editado',
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
                const servicioproducto = new ServicioProducto()
                servicioproducto.registrar(this.producto).then(data => {
                    const response = data
                    console.log(response)
                    if (response.mensaje == "agregado") {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Producto Registrado',
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
                this.tituloModal = "Modificar Producto"
                this.id_producto = data._id;
                this.producto.descripcion = data.descripcion;
                this.producto.precio = data.precio;
            } else if (this.modificar == 1) {
                this.tituloModal = "Registrar Producto"
                this.limpiarFormuralio();
            } else {
                this.tituloModal = "Detalle del Producto"
                this.id_producto = data._id;
                this.producto.descripcion = data.descripcion;
                this.producto.precio = data.precio;
            }
        },
        limpiarFormuralio() {
            this.producto.descripcion = '';
            this.producto.precio = 0;
            this.producto.categoria = '';
            this.producto.stock = '';
            this.producto.costo = '';
            this.producto.nombre = '';
            this.producto.unidadMedida = '';
            this.producto.codigo = '';
        }
    }
}
</script>
