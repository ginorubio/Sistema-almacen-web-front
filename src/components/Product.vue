<template>
    <content-header title="Productos" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button v-if="$store.state.rol == 'jefe_almacen'" id="show-modal" @click.prevent="showModal = true; modificar = 1; abrirModal()" type="button"
            class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2" aria-hidden="true"></i> Nuevo Producto
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
                            <label for="codigo">Código</label>
                            <input v-if="modificar == 3" disabled class="form-control" id="codigo"
                                v-model="producto.codigo" />
                            <input v-else class="form-control" id="codigo" v-model="producto.codigo" />
                        </div>
                        <div class="text-danger" v-if="v$.producto.codigo.$error">
                            {{ v$.producto.codigo.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input v-if="modificar == 3" disabled class="form-control" id="nombre"
                                v-model="producto.nombre" />
                            <input v-else class="form-control" id="nombre" v-model="producto.nombre" />
                        </div>
                        <div class="text-danger" v-if="v$.producto.nombre.$error">
                            {{ v$.producto.nombre.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="descripcion">Descripcion</label>
                            <textarea v-if="modificar == 3" disabled class="form-control" id="descripcion"
                                v-model="producto.descripcion" style="height: 100px"></textarea>
                            <textarea v-else class="form-control" id="descripcion" v-model="producto.descripcion"
                                style="height: 100px"></textarea>
                        </div>
                        <div class="text-danger" v-if="v$.producto.descripcion.$error">
                            {{ v$.producto.descripcion.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Precio</label>
                            <input v-if="modificar == 3" disabled type="number" class="form-control"
                                v-model="producto.precio">
                            <input v-else type="number" class="form-control" v-model="producto.precio">
                        </div>
                        <div class="text-danger" v-if="v$.producto.precio.$error">
                            {{ v$.producto.precio.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Stock</label>
                            <input v-if="modificar == 3" disabled type="number" class="form-control"
                                v-model="producto.stock">
                            <input v-else type="number" class="form-control" v-model="producto.stock">
                        </div>
                        <div class="text-danger" v-if="v$.producto.stock.$error">
                            {{ v$.producto.stock.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Costo</label>
                            <input v-if="modificar == 3" disabled type="number" class="form-control"
                                v-model="producto.costo">
                            <input v-else type="number" class="form-control" v-model="producto.costo">
                        </div>
                        <div class="text-danger" v-if="v$.producto.costo.$error">
                            {{ v$.producto.costo.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="rol">Categoría</label>
                            <select v-if="modificar == 3" disabled id="categoria" name="categoria" class="form-control"
                                v-model="producto.categoria">
                                <option disabled selected value="">--Seleccione un categoría--</option>
                                <option v-for="categoria in categorias">{{ categoria.nombre }}</option>
                            </select>
                            <select v-else id="categoria" name="categoria" class="form-control"
                                v-model="producto.categoria">
                                <option disabled selected value="">--Seleccione una categoría--</option>
                                <option v-for="categoria in categorias">{{ categoria.nombre }}</option>
                            </select>
                        </div>
                        <div class="text-danger" v-if="v$.producto.categoria.$error">
                            {{ v$.producto.categoria.$errors[0].$message }}
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

            <template #button_buscar>
                <label class="mr-2" for="">BUSCAR:</label>
                <input class="rounded-pill" type="search" v-model="cadena_buscar">
                <button class="btn btn-primary" @click="buscar(cadena_buscar)"><i class="fas fa-search" aria-hidden="true"></i></button>
            </template>
            <template #thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col">PRECIO</th>
                    <th scope="col">STOCK</th>
                    <th scope="col">ACCIONES</th>
                </tr>
            </template>

            <template #tbody>
                <tr v-for="producto in productosPaginados" :key="producto._id">
                    <td>{{ producto._id }}</td>
                    <td>{{ producto.nombre }}</td>
                    <td>{{ producto.descripcion }}</td>
                    <td>{{ producto.precio }}</td>
                    <td>{{ producto.stock }}</td>
                    <td>
                        <button @click="showModal = true; modificar = 3; abrirModal(producto)" class="btn btn-info mr-2"><i
                                class="fa fa-eye" aria-hidden="true"></i></button>
                        <button @click="showModal = true; modificar = 2; abrirModal(producto)"
                            class="btn btn-success mr-2"><i class="far fa-edit" aria-hidden="true"></i></button>
                        <button type="button" @click="borrarProductos(producto)" class="btn btn-danger "><i
                                class="fas fa-trash" aria-hidden="true"></i></button>
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
import { ServicioCategorias } from '@/services/ServicesCategorys';
import DataTable from '../components/DataTable.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, minLength, helpers,maxLength } from '@vuelidate/validators'

const numberValido = helpers.regex(/^\d+$/);
const caracterValido = helpers.regex(/^[a-zA-Z]+(\s?[a-zA-Z]*)*[a-zA-Z]+$/);

export default {
    name: "productos",
    components: {
        ContentHeader,
        Content,
        Modal,
        DataTable,
    },
    setup: () => ({
        v$: useVuelidate()
    }),
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
            cadena_buscar: '',
            categorias: []
        }
    },
    validations() {
        return {
            producto: {
                descripcion: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 5', minLength(5)),
                    maxLength: helpers.withMessage('El máximo número de caracteres es 50', maxLength(50))
                },
                precio: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minValue: helpers.withMessage('El mínimo valor es 0', minValue(0)) 
                },
                categoria: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 5', minLength(5))
                },
                nombre: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 5', minLength(5)),
                    caracteres: helpers.withMessage('Caracter no valido', caracterValido) 
                },
                codigo: {
                    required: helpers.withMessage('El valor es requerido', required),
                    number: helpers.withMessage('Solo admite números ', numberValido),
                },
                stock: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minValue: helpers.withMessage('El mínimo valor es 0', minValue(0)) 
                },
                costo: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minValue: helpers.withMessage('El mínimo valor es 0', minValue(0)) 
                },
            }
        }
    },
    created() {
        this.mostrarProductos();
        this.mostrarCategorias();

    },
    methods: {
        setValues(obj) {
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
        mostrarCategorias() {
            const servicioCategorias = new ServicioCategorias()

            servicioCategorias.mostrar().then(data => {
                const response = data
                this.categorias = response.data;
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
                        if (response.status === 200) {
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
            this.v$.$validate();
            if (!this.v$.$error) {
                if (this.modificar == 2) {
                    const servicioproducto = new ServicioProducto()
                    servicioproducto.modificar(this.producto, this.id_producto).then(data => {
                        const response = data
                        if (response.status === 200) {
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
                    const servicioproducto = new ServicioProducto()
                    servicioproducto.registrar(this.producto).then(data => {
                        const response = data
                        if (response.status === 201) {
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
                this.producto.error = true;
            }

        },
        abrirModal(data = {}) {
            if (this.modificar == 2) {
                this.tituloModal = "Modificar Producto"
                this.id_producto = data._id;
                this.producto.descripcion = data.descripcion;
                this.producto.stock = data.stock;
                this.producto.costo = data.costo;
                this.producto.precio = data.precio;
                this.producto.nombre = data.nombre;
                this.producto.codigo = data.codigo;
                const index = this.categorias.findIndex(x => x.descripcion == data.categoria)
                this.producto.categoria =  this.categorias[index].descripcion

            } else if (this.modificar == 1) {
                this.tituloModal = "Registrar Producto"
                this.limpiarFormuralio();
            } else {
                this.tituloModal = "Detalle del Producto"
                this.id_producto = data._id;
                this.producto.descripcion = data.descripcion;
                this.producto.stock = data.stock;
                this.producto.costo = data.costo;
                this.producto.precio = data.precio;
                this.producto.nombre = data.nombre;
                this.producto.codigo = data.codigo;
                const index = this.categorias.findIndex(x => x.descripcion == data.categoria)
                this.producto.categoria =  this.categorias[index].descripcion
            }
        },
        limpiarFormuralio() {
            this.producto.descripcion = '';
            this.producto.precio = 0;
            this.producto.categoria = '';
            this.producto.stock = 0;
            this.producto.costo = 0;
            this.producto.nombre = '';
            this.producto.unidadMedida = '';
            this.producto.codigo = '';
            this.producto.categoria = '';

        },
        buscar(id) {
            if (id) {
                let producto = []
                const servicioproducto = new ServicioProducto()
                servicioproducto.buscar(id).then(data => {
                    const response = data

                    if (response.status === 200) {
                        producto[0] = response.data
                        this.productos = producto
                    } else {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo encontrar el producto!',
                        })
                    }
                }, error => {
                    this.mostrarProductos()
                })
            } else {
                this.mostrarProductos()
            }
        }
    }
}
</script>
