<template>
    <content-header title="Movimientos" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button v-if="$store.state.rol != 'admin'" id="show-modal" type="button"
            @click.prevent="showModal = true, modificar = false; abrirModal()" class="btn btn-primary">
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
                        <div class="text-danger" v-if="v$.movimiento.codigo.$error">
                            {{ v$.movimiento.codigo.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-sm mb-2">
                        <div class="form-group">
                            <label for="fecha">Fecha</label>
                            <input type="date" class="form-control" v-model="movimiento.fecha" />
                        </div>
                        <div class="text-danger" v-if="v$.movimiento.fecha.$error">
                            {{ v$.movimiento.fecha.$errors[0].$message }}
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
                        <div class="text-danger" v-if="v$.movimiento.factura.$error">
                            {{ v$.movimiento.factura.$errors[0].$message }}
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
                        <div class="text-danger" v-if="v$.movimiento.tipo.$error">
                            {{ v$.movimiento.tipo.$errors[0].$message }}
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
                <!-- 
                    Autor: Gino Rubio Pacheco
                    fecha: 23/11/2022
                    
                    Tabla de la lista de productos
                -->
                <div class="table-responsive">
                    <table class="table table-bordered table-striped" aria-label="tabla-description-producto">
                        <thead>
                            <tr>
                                <th>CÓDIGO</th>
                                <th>NOMBRE</th>
                                <th>DESCRIPCION</th>
                                <th>CATEGORÍA</th>
                                <th>STOCK</th>
                                <th>PRECIO</th>
                                <th>CANTIDAD</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(detalle, index) in listaDetalleProductos" :key="detalle.codigo_product">
                                <td>{{ detalle.codigo_product }}</td>
                                <td>{{ detalle.nombre }}</td>
                                <td>{{ detalle.descripcion }}</td>
                                <td>{{ detalle.nomCategoria }}</td>
                                <td>{{ detalle.stock }}</td>
                                <td>{{ detalle.precio }}</td>
                                <td>
                                    {{ detalle.cantidad }}
                                </td>
                                <td>
                                    <button type="button" @click="borrarProducto(index)" class="btn btn-danger "><i
                                            class="fas fa-trash" aria-hidden="true"></i></button>
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
                            <label for="detalle-unidad">Categoría</label>
                            <input disabled v-model="producto.nomCategoria" type="text"
                                placeholder="Nombre de categoria" class="form-control" />
                        </div>
                    </div>
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
        <!-- 
            Autor: Gino Rubio Pacheco
            fecha: 23/11/2022

            Tabla de la lista de movimientos
        -->
        <data-table :lista="movimientos" @getValues="setValues">
            <template #button_buscar>
                <label class="mr-2" for="">BUSCAR:</label>
                <input class="rounded-pill" placeholder="Buscar por código" type="search" v-model="cadena_buscar">
                <button class="btn btn-primary mr-2" @click="buscar(cadena_buscar)"><i class="fas fa-search"
                        aria-hidden="true"></i></button>
            </template>
            <template #thead>
                <tr>
                    <th scope="col">CÓDIGO</th>
                    <th scope="col">CÓDIGO FACTURA</th>
                    <th scope="col">FECHA</th>
                    <th scope="col">TIPO</th>
                    <th scope="col">RESPONSABLE</th>
                    <th scope="col">ACCIONES</th>
                </tr>
            </template>

            <template #tbody>
                <tr v-for="movimiento in movimientosPaginados" :key="producto._id">
                    <td>{{ movimiento.codigo }}</td>
                    <td>{{ movimiento.factura }}</td>
                    <td>{{ movimiento.fecha }}</td>
                    <td>{{ movimiento.tipo }}</td>
                    <td>{{ movimiento.name_responsable }}</td>
                    <td>
                        <button @click="showModal = true; modificar = 3; abrirModal(movimiento)"
                            class="btn btn-info mr-2"><i class="fa fa-eye" aria-hidden="true"></i></button>
                        <button v-if="movimiento.estado != 'Anulado' && $store.state.rol == 'jefe_almacen'"
                            type="button" @click="borrarMovimiento(movimiento)" class="btn btn-danger mr-2"><i
                                class="fas fa-trash" aria-hidden="true"></i></button>

                    </td>
                </tr>
            </template>
        </data-table>
    </content>
</template>
  
<script>
import { mapState } from 'vuex';
import ContentHeader from '@/components/ContentHeader.vue';
import Content from '@/components/Content.vue';
import Modal from '../components/Modal.vue';
import DataTable from './DataTable.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers, maxLength } from '@vuelidate/validators'
import store from '../store'

import { ServicioMovimientos } from '@/services/ServicesMovements';
import { ServicioProducto } from '@/services/ServicesProducts';

export default {
    components: {
        ContentHeader, Content, Modal, DataTable
    },
    setup: () => ({
        v$: useVuelidate()
    }),
    data() {
        return {
            cabecera: '',
            movimientos: [],
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
                nomCategoria: '',
                stock: 0,
                precio: 0,
            },
            cantidad: 1,
        }
    },
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
                //validacion del campo tipo
                tipo: {
                    required: helpers.withMessage('El valor es requerido', required)
                },
                //validacion de fecha
                fecha: {
                    required: helpers.withMessage('El valor es requerido', required)
                }
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
                this.movimientos = response.data;
            }, error => {
                console.log(error)
            })
        },
         /* 
            Autor: Gino Rubio Pacheco
            fecha: 05/11/2022
            función relacionada al CUS de anular movimientos por codigo,
            permite realizar la anulacion de un movimiento
        */
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
                title: 'Desea Anular el movimiento?',
                text: `Se anulará el movimiento ${movimiento.codigo}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, Anular!',
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
                                'Anulado!',
                                `El movimiento ${movimiento.codigo}.`,
                                'success'
                            )
                            this.mostrarMovimientos();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `El movimiento ${movimiento.codigo} no se pudo anular.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El movimiento ${movimiento.codigo} no se pudo anular.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El movimiento ${movimiento.codigo} no fue anulado.`,
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
                        fecha: 29/11/2022
                        función relacionada al CUS de Registrar movimiento
                    */
                    if (this.listaDetalleProductos.length != 0) {
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
                    } else {
                        //lista de detalle del movimiento vacio
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Lista vacía!',
                        })
                    }
                }
            } else {
                this.movimiento.error = true;
            }

        },
        agregarProducto() {
            /* 
                Autor: Gino Rubio Pacheco
                fecha: 29/11/2022
                función relacionada al CUS de agregar productos al movimiento
            */
            let detalleProducto = {
                codigo_product: this.producto.codigo,
                nombre: this.producto.nombre,
                descripcion: this.producto.descripcion,
                stock: this.producto.stock,
                precio: this.producto.precio,
                nomCategoria: this.producto.nomCategoria,
                cantidad: this.cantidad
            }
            //validar codigo vacio
            if (this.producto.nombre) {
                if (this.listaDetalleProductos.find(detalle => detalle.codigo_product === detalleProducto.codigo_product)) {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Este producto ya fue agregado!',
                    })
                } else {
                    //validacion de la cantidad
                    if (this.cantidad <= this.producto.stock) {
                        if (this.cantidad >= 0) {
                            this.listaDetalleProductos.push(detalleProducto)
                            this.producto = {
                                codigo: '',
                                nombre: '',
                                descripcion: '',
                                nomCategoria: '',
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
                        } else {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'La cantidad no puede ser negativa!',
                            })
                        }

                    } else {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'La cantidad debe ser menor o igual que el stock!',
                        })
                    }
                }
            } else {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Digite los datos corectamente!',
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
                fecha: 23/11/2022
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
                        this.producto.nomCategoria = response.data.nomCategoria
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
         /* 
            Autor: Gino Rubio Pacheco
            fecha: 05/11/2022
            función relacionada al CUS de buscar movimientos por codigo,
            permite realizar la busqueda del movimiento
        */
        buscar(codigo) {
            if (codigo) {
                let movimiento = []
                const serviciomovimientos = new ServicioMovimientos()
                serviciomovimientos.buscar(codigo).then(data => {
                    const response = data
                    console.log(response)
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
                this.mostrarMovimientos()
            }
        }
    },
    created() {
        this.mostrarMovimientos();
        this.movimiento.name_responsable = `${store.state.username}`;
        this.movimiento.id_responsable = `${store.state.id}`;
    }
}
</script>