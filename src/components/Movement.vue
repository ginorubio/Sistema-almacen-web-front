<template>
    <content-header title="Movimientos" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button id="show-modal" type="button" @click.prevent="showModal = true, modificar = false; abrirModal()"
            class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2" aria-hidden="true"></i> Nuevo Movimiento
        </button>
    </div>
    <!-- Modal para agregar los movimientos -->
    <teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false; v$.$reset()" tamanio="modal-xl">
            <template #header>
                <h3>{{ tituloModal }}</h3>
            </template>
            <template #body>

                <div class="row">
                    <div class="col-sm mb-2">
                        <div class="form-group">
                            <label>Código</label>
                            <input type="text" class="form-control" placeholder="Código de movimiento"
                                v-model="movimiento.codigo">
                        </div>
                    </div>

                    <div class="col-sm mb-2">
                        <div class="form-group">
                            <label for="fecha">Fecha</label>
                            <input type="date" class="form-control" v-model="movimiento.fecha" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm mb-2">
                        <div class="form-group">
                            <label for="factura">Código de Factura</label>
                            <input type="text" class="form-control" placeholder="Código de factura"
                                v-model="movimiento.factura" />
                        </div>
                    </div>

                    <div class="col-sm mb-2">
                        <div class="form-group">
                            <label for="tipo">Tipo</label>
                            <select class="form-control" v-model="movimiento.tipo">
                                <option disabled selected value="">--Seleccione un tipo--</option>
                                <option v-for="tipo in tipos">{{ tipo }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-sm-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="proveedor">Responsable</label>
                            <input disabled type="text" class="form-control" v-model="movimiento.name_responsable" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <button @click.prevent="showModal1 = true" type="text" class="btn btn-primary"><i
                                    aria-hidden="true" class="fas fa-plus-circle"></i>Agregar Producto</button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>CÓDIGO</th>
                                <th>NOMBRE</th>
                                <th>DESCRIPCION</th>
                                <th>STOCK</th>
                                <th>PRECIO</th>
                                <th>CANTIDAD</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(detalle, index) in listaDetalleProductos" :key="detalle.producto.codigo">
                                <td>{{ detalle.producto.codigo }}</td>
                                <td>{{ detalle.producto.nombre }}</td>
                                <td>{{ detalle.producto.descripcion }}</td>
                                <td>{{ detalle.producto.stock }}</td>
                                <td>{{ detalle.producto.precio }}</td>
                                <td>
                                    {{ detalle.cantidad }}
                                </td>
                                <td>
                                    <button type="button" @click="borrarProducto(index)" class="btn btn-danger "><i
                                            class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template #footer>
                <button @click="guardar()" type="button" class="btn btn-success" data-dismiss="modal">Guardar</button>
            </template>
        </modal>
    </teleport>

    <!--
        Autor: Gino Rubio Pacheco
        fecha: /11/2022
        Modal asociado al CUS agregar producto al movimiento
    -->
    <!-- Modal para agregar producto a los movimientos -->
    <teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal1" @close="showModal1 = false" tamanio="modal-lg">
            <template #header>
                <h3>{{ tituloModalProducto }}</h3>
            </template>
            <template #body>

                <div class="row">
                    <div class="col mb-2">
                        <div class="form-group">
                            <label>Código</label>
                            <input v-model="producto.codigo" type="text" placeholder="Código de producto"
                                class="form-control " />
                        </div>
                    </div>
                    <div class="col mb-2 d-flex align-items-end">
                        <div class="form-group">
                            <button @click="buscarProducto(producto.codigo)" type="button" class="btn btn-primary"
                                data-dismiss="modal"><i class="fa fa-search mr-2" aria-hidden="true"></i>Buscar</button>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-descripcion">Nombre</label>
                            <input disabled v-model="producto.nombre" type="text" placeholder="Nombre del producto"
                                class="form-control" />
                        </div>
                    </div>

                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-stock-actual">Descipción</label>
                            <input disabled v-model="producto.descripcion" type="text"
                                placeholder="Descripción del producto" class="form-control" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-unidad">Stock</label>
                            <input disabled v-model="producto.stock" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-costo">Precio</label>
                            <input disabled v-model="producto.precio" type="number" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-cantidad">Cantidad</label>
                            <input v-model="cantidad" type="number" class="form-control" />
                        </div>
                    </div>
                </div>

            </template>
            <template #footer>
                <button @click="agregarProducto()" type="button" class="btn btn-success"
                    data-dismiss="modal">Agregar</button>
            </template>
        </modal>
    </teleport>
    <content>
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-bordered" aria-label="tabla-movimiento">
                        <thead class="bg-secondary text-white">
                            <tr>
                                <th scope="col">CÓDIGO</th>
                                <th scope="col">CÓDIGO FACTURA</th>
                                <th scope="col">FECHA</th>
                                <th scope="col">TIPO</th>
                                <th scope="col">RESPONSABLE</th>
                                <th scope="col">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>MO-001</td>
                                <td>spodl545s45</td>
                                <td>03/05/2022</td>
                                <td>Salida</td>
                                <td>Pedro Navarro Suarez</td>
                                <td>
                                    <button class="btn btn-info mr-2"><i class="fa fa-eye"
                                            aria-hidden="true"></i></button>
                                    <button class="btn btn-success mr-2"><i class="far fa-edit"
                                            aria-hidden="true"></i></button>
                                    <button type="button" class="btn btn-danger mr-2"><i aria-hidden="true"
                                            class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>MO-002</td>
                                <td>spodl545s45</td>
                                <td>03/05/2022</td>
                                <td>Salida</td>
                                <td>Pedro Navarro Suarez</td>
                                <td>
                                    <button class="btn btn-info mr-2"><i class="fa fa-eye"
                                            aria-hidden="true"></i></button>
                                    <button class="btn btn-success mr-2"><i class="far fa-edit"
                                            aria-hidden="true"></i></button>
                                    <button type="button" class="btn btn-danger mr-2"><i aria-hidden="true"
                                            class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>MO-001</td>
                                <td>spodl545s45</td>
                                <td>03/05/2022</td>
                                <td>Salida</td>
                                <td>Pedro Navarro Suarez</td>
                                <td>
                                    <button class="btn btn-info mr-2"><i class="fa fa-eye"
                                            aria-hidden="true"></i></button>
                                    <button class="btn btn-success mr-2"><i class="far fa-edit"
                                            aria-hidden="true"></i></button>
                                    <button type="button" class="btn btn-danger mr-2"><i aria-hidden="true"
                                            class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </content>
</template>
  
<script>
import { mapState } from 'vuex';
import ContentHeader from '@/components/ContentHeader.vue';
import Content from '@/components/Content.vue';
import Modal from '../components/Modal.vue';
import DataTable from './DataTable.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, minLength, helpers, maxLength } from '@vuelidate/validators'
import store from '../store'

import { ServicioMovimientos } from '@/services/ServicesMovements';
import { ServicioProducto } from '@/services/ServicesProducts';

//expresion que solo admite letras de a-z y A-Z, incluido los espacios
const caracterValido = helpers.regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
//cadena: /^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/

const numeroEntero = helpers.regex(/^\d+$/);

export default {
    components: {
        ContentHeader, Content, Modal, DataTable
    },
    data() {
        return {
            cabecera: '',
            movimietos: [],
            movimiento: {
                codigo: '',
                factura: '',
                id_responsable: '',
                name_responsable: '',
                fecha: '',
                tipo: '',
                lista_items: []
            },
            showModal: false,
            showModal1: false,
            id_movimiento: 0,
            modificar: true,
            tituloModal: '',
            tituloModalProducto: 'Producto',
            tipos: ["Entrada", "Salida"],
            cadena_buscar: '',
            movimientosPaginados: [],
            listaDetalleProductos: [],
            producto: {
                codigo: '',
                nombre: '',
                descripcion: '',
                stock: 0,
                precio: 0,
            },
            cantidad: 1,
            detalleProducto: {
                producto: {
                    codigo: '',
                    nombre: '',
                    descripcion: '',
                    stock: 0,
                    precio: 0,
                },
                cantidad: 1
            }
        }
    },
    setup: () => ({
        v$: useVuelidate()
    }),
    validations() {
        return {
            movimiento: {
                //validaciones para el campo de codigo
                codigo: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 6', minLength(6)),
                    maxLength: helpers.withMessage('El máximo número de caracteres es 10', maxLength(10))
                },
                //validaciones para el campo de descripcion
                factura: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 8', minLength(8)),
                    maxLength: helpers.withMessage('El máximo número de caracteres es 10', maxLength(10))
                },
            },

        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        setValues(obj) {
            //retorno de la lista paginada
            this.movimientosPaginados = obj;
        },
        mostrarMovimientos() {
            //instancia del servicio
            const serviciomovimientos = new ServicioMovimientos()
            serviciomovimientos.mostrar().then(res => {
                const response = res
                this.movimietos = response.data;
            }, error => {
                console.log(error)
            })
        },
        borrarMovimiento(movimiento) {

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
                text: `Se eliminará el movimiento ${movimiento.codigo}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, Eliminar!',
                cancelButtonText: 'No, Cancelar!',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //peticion al servicio
                    const serviciomovimientos = new ServicioMovimientos()
                    serviciomovimientos.eliminar(movimiento._id).then(data => {
                        const response = data
                        if (response.status === 200) {
                            alertEliminar.fire(
                                'Eliminado!',
                                `El movimiento ${movimiento.codigo}.`,
                                'success'
                            )
                            this.mostrarMovimientos();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `El movimiento ${movimiento.codigo} no se pudo eliminar.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El movimiento ${movimiento.codigo} no se pudo eliminar.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El movimiento ${movimiento.codigo} no fue eliminado.`,
                        'error'
                    )
                }
            })
        },
        guardar() {
            if (this.modificar) {
                const serviciomovimientos = new ServicioMovimientos()
                serviciomovimientos.modificar(this.movimiento, this.id_movimiento).then(data => {
                    const response = data

                    if (response.status === 200) {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Movimiento Editado',
                            text: "Click en el botón para salir!",
                            showConfirmButton: true,
                            confirmButtonText: 'listo',
                            confirmButtonColor: 'btn btn-success',
                        })
                        this.mostrarMovimientos();
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
                    Autor: Gino Rubio Pacheco
                    fecha: /11/2022
                    función relacionada al CUS de Registrar movimiento
                */

                this.movimiento.lista_items = this.listaDetalleProductos
                const serviciomovimientos = new ServicioMovimientos()
                serviciomovimientos.registrar(this.movimiento).then(data => {
                    const response = data
                    console.log(response)
                    if (response.status === 200) {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Movimiento Registrado',
                            text: "Click en el botón para salir!",
                            showConfirmButton: true,
                            confirmButtonText: 'listo',
                            confirmButtonColor: 'btn btn-success',
                        })
                        this.mostrarMovimientos();
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
        agregarProducto() {
            /* 
                Autor: Gino Rubio Pacheco
                fecha: /11/2022
                función relacionada al CUS de agregar productos al movimiento
            */
            //validar codigo vacio
            //metodo para validar el stock del producto
            /**
                Validar la cantidad pedida en el movimiento con el stock
                //por realizar
             */
            let codigo = this.producto.codigo;
            let nombre = this.producto.nombre;
            let descripcion = this.producto.descripcion;
            let stock = this.producto.stock;
            let precio = this.producto.precio;
            let cantidad = this.cantidad;

            if (this.listaDetalleProductos.some(detalle => detalle.producto.codigo = codigo)) {
                console.log("productos listados: " + this.listaDetalleProductos)
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Este producto ya fue agregado!',
                })
            } else {
                this.detalleProducto.producto.codigo = codigo
                this.detalleProducto.producto.nombre = nombre
                this.detalleProducto.producto.descripcion = descripcion
                this.detalleProducto.producto.stock = stock
                this.detalleProducto.producto.precio = precio
                this.detalleProducto.cantidad = cantidad

                this.listaDetalleProductos.push(this.detalleProducto)
                console.log("productos listados: " + this.listaDetalleProductos.forEach(detalle => detalle))
                this.producto = {
                    codigo: '',
                    nombre: '',
                    descripcion: '',
                    stock: 0,
                    precio: 0
                };
                this.cantidad = 1;
                this.$swal.fire({
                    icon: 'success',
                    title: 'Producto agregado al movimiento',
                    text: "Click en el botón para salir!",
                    showConfirmButton: true,
                    confirmButtonText: 'ok',
                    confirmButtonColor: 'btn btn-success',
                })
            }
        },
        borrarProducto(index) {
            //elimina 1 elemento del arreglo a partir del numero de index
            this.listaDetalleProductos.splice(index, 1)
        },
        buscarProducto(codigo) {
            /* 
                Autor: Gino Rubio Pacheco
                fecha: /11/2022
                función relacionada al CUS de agregar producto al movimiento,
                permite realizar la busqueda del producto
            */
            if (codigo) {
                //peticion al servidor para buscar
                const servicioProducto = new ServicioProducto()
                servicioProducto.buscar(codigo).then(data => {
                    const response = data
                    if (response.status === 200) {
                        this.producto.nombre = response.data.nombre
                        this.producto.descripcion = response.data.descripcion
                        this.producto.stock = response.data.stock
                        this.producto.precio = response.data.precio
                    } else {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo encontrar el producto!',
                        })
                    }
                }, error => {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo encontrar el producto!',
                    })
                })
            } else {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Código requerido!',
                })
            }
        },
        abrirModal(data = {}) {
            if (this.modificar) {
                this.tituloModal = "Modificar Movimiento"
                this.id_movimiento = data.codigo;
                this.movimiento.codigo = data.codigo;
                this.movimiento.factura = data.factura;
                this.movimiento.fecha = data.fecha;
                this.movimiento.tipo = data.tipo;
                this.movimiento.lista_items = data.lista_items;

            } else {
                this.tituloModal = "Registrar Movimiento"
                this.limpiarFormuralio();
            }
        },
        limpiarFormuralio() {
            this.movimiento.codigo = '';
            this.movimiento.factura = '';
            this.movimiento.fecha = '';
            this.movimiento.tipo = '';
            this.movimiento.lista_items = [];
            this.listaDetalleProductos = [];
        },
        buscar(id) {
            if (id) {
                let movimiento = []
                const serviciomovimientos = new ServicioMovimientos()
                serviciomovimientos.buscar(id).then(data => {
                    const response = data

                    if (response.status === 200) {
                        movimiento[0] = response.data
                        this.movimientos = movimiento
                    } else {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo encontrar el movimiento!',
                        })
                    }
                }, error => {
                    this.mostrarMovimientos()
                })
            } else {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se pudo encontrar el movimiento!',
                })
            }
        }
    },
    created() {
        this.movimiento.name_responsable = `${store.state.username}`;
        this.movimiento.id_responsable = `${store.state.id}`;
    }
}
</script>