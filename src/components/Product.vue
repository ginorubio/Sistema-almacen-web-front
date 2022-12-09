<template>
    <content-header title="Productos" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button v-if="$store.state.rol == 'jefe_almacen'" id="show-modal"
            @click.prevent="showModal = true; modificar = 1; abrirModal()" type="button" class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2" aria-hidden="true"></i> Nuevo Producto
        </button>
        <div class="d-flex justify-content-end">
            <div>
                <div class="habilidados" :class="{ estadoactivo: activeProductoHabilitados }">
                    <button type="button" @click="activeProductoHabilitados = true; mostrarProductos()">
                        <i class="fas fa-circle mr-2" aria-hidden="true"></i> <strong>Habilitados</strong>
                    </button>
                </div>
                <div class="inhabilitados" :class="{ estadoinhabilitado: activeProductoInhabilitados }">
                    <button type="button" @click="activeProductoInhabilitados == true, mostrarProductosInhabilitados()">
                        <i class="fas fa-circle mr-2" aria-hidden="true"></i> <strong>Deshabilitados</strong>
                    </button>
                </div>
            </div>

        </div>
    </div>
    <!-- 
        Autor: Deyvi Ramos Panaifo
        fecha: 05/11/2022

        Modal para el resgistro, descripcion y edicion del producto
    -->
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
                            <label for="codigo">Código</label>


                            <input v-if="modificar == 3 || modificar == 2" disabled class="form-control" id="codigo"
                                v-model="producto.codigo" />
                            <input v-else class="form-control" id="codigo" placeholder="Digite el codigo" v-model="producto.codigo" />

                        </div>
                        <div class="text-danger" v-if="v$.producto.codigo.$error">
                            {{ v$.producto.codigo.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input v-if="modificar == 3 || modificar == 2" disabled class="form-control" id="nombre"
                                v-model="producto.nombre" />
                            <input v-else class="form-control" id="nombre" placeholder="Digite el nombre" v-model="producto.nombre" />
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
                            <textarea v-else class="form-control" id="descripcion" placeholder="Digite la descripcion" v-model="producto.descripcion"
                                style="height: 100px"></textarea>
                        </div>
                        <div class="text-danger" v-if="v$.producto.descripcion.$error">
                            {{ v$.producto.descripcion.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Precio</label>
                            <div class="d-flex">
                                <div class="d-flex codigo-inicio">
                                    <p>S/</p>
                                </div>
                                <input v-if="modificar == 3" disabled type="number" class="form-control"
                                    v-model="producto.precio">
                                <input v-else type="number" class="form-control" v-model="producto.precio">
                            </div>

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
                            <label>Stock Mínimo</label>
                            <input v-if="modificar == 3" disabled type="number" class="form-control"
                                v-model="producto.stockMinimo">
                            <input v-else type="number" class="form-control" v-model="producto.stockMinimo">
                        </div>
                        <div class="text-danger" v-if="v$.producto.stockMinimo.$error">
                            {{ v$.producto.stockMinimo.$errors[0].$message }}
                        </div>
                    </div>


                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label>Costo</label>
                            <div class="d-flex">
                                <div class="d-flex codigo-inicio">
                                    <p>S/</p>
                                </div>
                                <input v-if="modificar == 3" disabled type="number" class="form-control"
                                    v-model="producto.costo">
                                <input v-else type="number" class="form-control" v-model="producto.costo">
                            </div>
                        </div>
                        <div class="text-danger" v-if="v$.producto.costo.$error">
                            {{ v$.producto.costo.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label v-if="modificar == 2" for="rol">Categoría</label>
                            <select v-if="modificar == 3 || modificar == 2" disabled id="categoria" name="categoria"
                                class="form-control" v-model="producto.nomCategoria">
                                <option disabled selected value="">--Seleccione un categoría--</option>
                                <option v-for="categoria in categorias">{{ categoria.nombre }}</option>
                            </select>
                            <select v-else id="categoria" name="categoria" class="form-control"
                                v-model="producto.nomCategoria">
                                <option disabled selected value="">--Seleccione una categoría--</option>
                                <option v-for="categoria in categorias">{{ categoria.nombre }}</option>
                            </select>
                        </div>
                        <div class="text-danger" v-if="v$.producto.nomCategoria.$error">
                            {{ v$.producto.nomCategoria.$errors[0].$message }}
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
        <!-- 
            Autor: Deyvi Ramos Panaifo
            fecha: 05/11/2022

            Tabla de la lista de productos
        -->
        <data-table :lista="productos" @getValues="setValues">
            <template #button_buscar>
                <label class="mr-2" for="">BUSCAR:</label>
                <input class="rounded-pill" placeholder="Buscar por código" type="search" v-model="cadena_buscar">
                <button class="btn btn-primary mr-2" @click="buscar(cadena_buscar)"><i class="fas fa-search"
                        aria-hidden="true"></i></button>
                <button v-if="activeProductoHabilitados" class="btn btn-primary" @click="mostrarStockMinimo()"><i class="fas fa-search mr-1"
                        aria-hidden="true"></i>Stock Mínimo</button>
            </template>
            <template #thead>
                <tr>
                    <th scope="col">CÓDIGO</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col">PRECIO</th>
                    <th scope="col">STOCK</th>
                    <th scope="col">STOCK MINIMO</th>
                    <th scope="col">CATEGORÍA</th>
                    <th scope="col">ACCIONES</th>
                </tr>
            </template>

            <template #tbody>
                <tr v-for="producto in productosPaginados" :key="producto._id">
                    <td>{{ producto.codigo }}</td>
                    <td>{{ producto.nombre }}</td>
                    <td>{{ producto.descripcion }}</td>
                    <td>{{ producto.precio }}</td>
                    <td>{{ producto.stock }}</td>
                    <td>{{ producto.stockMinimo }}</td>
                    <td>{{ producto.nomCategoria }}</td>
                    <td>
                        <button @click="showModal = true; modificar = 3; abrirModal(producto)"
                            class="btn btn-info mr-2"><i class="fa fa-eye" aria-hidden="true"></i></button>
                        <button v-if="$store.state.rol == 'jefe_almacen' && producto.estado != 'inhabilitado'"
                            @click="showModal = true; modificar = 2; abrirModal(producto)"
                            class="btn btn-success mr-2"><i class="far fa-edit" aria-hidden="true"></i></button>
                        <button v-if="producto.estado != 'habilitado' && $store.state.rol == 'jefe_almacen'"
                            type="button" @click="ascenderProducto(producto)" class="btn btn-primary mr-2"><i
                                class="fas fa-arrow-up" aria-hidden="true"></i></button>
                        <button v-if="producto.estado != 'inhabilitado' && $store.state.rol == 'jefe_almacen'"
                            type="button" @click="descenderProducto(producto)" class="btn btn-danger "><i
                                class="fas fa-arrow-down" aria-hidden="true"></i></button>

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
import { required, minValue, minLength, helpers, maxLength } from '@vuelidate/validators'

//Expresion que solo admite digitos
const numeroEntero = helpers.regex(/^\d+$/);
//expresion que solo admite letras de a-z y A-Z, incluido los espacios
const caracterValido = helpers.regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
//cadena: /^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/
//expresion de codigo de producto
const codigoValido = helpers.regex(/^[A-Za-z0-9]+$/);



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
                nomCategoria: "",
                nombre: "",
                codigo: "",
                stock: "",
                stockMinimo: "",
                costo: "",
                estado: ""
            },
            activeProductoHabilitados: true,
            activeProductoInhabilitados: false,
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
            /* 
                Autor: Deyvi Ramos Panaifo
                fecha: 05/11/2022
                validaciones de los campos del producto usando el VueValidate 
            */
            producto: {
                //validaciones para el campo de descripcion
                descripcion: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 5', minLength(5)),
                    maxLength: helpers.withMessage('El máximo número de caracteres es 50', maxLength(50))
                },
                //validaciones para el campo de precio
                precio: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minValue: helpers.withMessage('El mínimo valor es 0', minValue(0))
                },
                //validaciones para el campo de categoria
                nomCategoria: {
                    required: helpers.withMessage('El valor es requerido', required),
                },
                //validaciones para el campo de nombre
                nombre: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 5', minLength(5)),
                    caracteres: helpers.withMessage('Caracter no valido', caracterValido)
                },
                //validaciones para el campo de codigo
                codigo: {
                    required: helpers.withMessage('El valor es requerido', required),
                    codigoValido: helpers.withMessage('Campo alfa-númerico', codigoValido),
                    minLength: helpers.withMessage('Campo de 11 caracteres', minLength(11)),
                    maxLength: helpers.withMessage('Campo de 11 caracteres', maxLength(11))
                },
                //validaciones para el campo de stock
                stock: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minValue: helpers.withMessage('El mínimo valor es 0', minValue(0)),
                    numeroEntero: helpers.withMessage('Solo número entero', numeroEntero)
                },
                stockMinimo: {
                    required: helpers.withMessage('El valor es requerido', required),
                    minValue: helpers.withMessage('El mínimo valor es 0', minValue(0)),
                    numeroEntero: helpers.withMessage('Solo número entero', numeroEntero)
                },
                //validaciones para el campo de costo
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
        /* 
            Autor: Deyvi Ramos Panaifo
            fecha: 15/11/2022
            función relacionada al CUS de Listar Productos Habilitados
        */
        mostrarProductos() {
            this.activeProductoHabilitados = true;
            this.activeProductoInhabilitados = false;
            //instancia del servicio de productos
            const servicioproducto = new ServicioProducto()
            //se llama al metodo mostrar productos
            servicioproducto.mostrar().then(data => {
                const response = data
                this.productos = response.data;
            }, error => {
                console.log(error)
            })
        },
        /* 
            Autor: Deyvi Ramos Panaifo
            fecha: /11/2022
            función relacionada al CUS de Listar Productos con stock mínimo
        */
        mostrarStockMinimo() {
            const servicioproducto = new ServicioProducto()

            servicioproducto.mostrarStockMinimo().then(data => {
                const response = data
                console.log(response)
                if (response.status === 200) {
                    this.productos = response.data;

                } else {
                    console.log(error)
                }

            }, error => {
                console.log(error)
            })
        },
        mostrarCategorias() {
            //instancia del servicio de categorias
            const servicioCategorias = new ServicioCategorias()
            //se llama al metodo mostrar categorias
            servicioCategorias.mostrar().then(data => {
                const response = data
                this.categorias = response.data;
            }, error => {
                console.log(error)
            })
        },
        /* 
            Autor: Aldo Ramirez
            fecha: 15/11/2022
            función relacionada al CUS de Listar Productos InHabilitados
        */
        mostrarProductosInhabilitados() {
            this.activeProductoHabilitados = false;
            this.activeProductoInhabilitados = true;
            //instancia del servicio usuarios
            const servicioproducto = new ServicioProducto()
            //se llama al metodo mostrar usuarios inhabilitados
            servicioproducto.mostrarInhabilitados().then(data => {
                const response = data
                if (response.status === 200) {
                    this.productos = response.data;
                } else {
                    console.log(error)
                }
            }, error => {
                console.log(error)
            })
        },
        /* 
            Autor: Gino Rubio Pacheco
            fecha: 14/11/2022
            función relacionada al CUS de Dar de alta Producto
        */
        ascenderProducto(producto) {

            //Alert para dar de alta
            const alertEliminar = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            alertEliminar.fire({
                title: '¿Está seguro de dar de alta?',
                text: `Se dará de alta al producto ${producto.descripcion}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //instancia del servicio de producto
                    const servicioproducto = new ServicioProducto()
                    //se llama al metodo eliminar productos
                    servicioproducto.ascenderProducto(producto._id).then(data => {
                        const response = data
                        if (response.status === 200) {
                            alertEliminar.fire(
                                'Se dio de alta!',
                                `El producto ${producto.descripcion} fue dado de alta.`,
                                'success'
                            )
                            this.mostrarProductos();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `El producto ${producto.descripcion} no se pudo dar de alta.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El producto ${producto.descripcion} no se pudo dar de alta.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El producto ${producto.descripcion} no se pudo dar de alta.`,
                        'error'
                    )
                }
            })
        },
        /* 
            Autor: Deyvi Ramos Panaifo
            fecha: 07/11/2022
            función relacionada al CUS de Dar de baja Producto
        */
        descenderProducto(producto) {

            //Alert para dar de baja
            const alertEliminar = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            alertEliminar.fire({
                title: '¿Está seguro de dar de baja?',
                text: `Se dará de baja al producto ${producto.descripcion}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //instancia del servicio de producto
                    const servicioproducto = new ServicioProducto()
                    //se llama al metodo eliminar productos
                    servicioproducto.descenderProducto(producto._id).then(data => {
                        const response = data
                        if (response.status === 200) {
                            alertEliminar.fire(
                                'Se dio de baja!',
                                `El producto ${producto.nombre} fue dado de baja.`,
                                'success'
                            )
                            this.mostrarProductos();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `El producto ${producto.nombre} no se pudo dar de baja.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `El producto ${producto.nombre} no se pudo dar de baja.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `El producto ${producto.nombre} no se pudo dar de baja.`,
                        'error'
                    )
                }
            })
        },
        async guardar() {
            //se llama al validador
            this.v$.$validate();

            //verificamos las validaciones realizadas en los campos
            if (!this.v$.$error) {
                /* 
                    Autor: Gino Rubio Pacheco
                    fecha: 07/11/2022
                    función relacionada al CUS de Editar Productos
                */
                if (this.modificar == 2) {

                    //instancia del servicio de producto
                    const servicioproducto = new ServicioProducto()
                    //se llama al metodo modificar productos
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
                    /* 
                        Autor: Gino Rubio Pacheco
                        fecha: 07/11/2022
                        función relacionada al CUS de Registrar Productos
                    */

                    console.log("agregando producto: "+this.producto)
                    //instancia del servicio de producto
                    const servicioproducto = new ServicioProducto()
                    //se llama al metodo registrar productos
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
        /* 
            Autor: Deyvi Carlos Ramos Panaifo
            fecha: 22/10/2022
            función que permite a activar un modal donde se vizualizaran
            los campos del producto
        */
        abrirModal(data = {}) {
            if (this.modificar == 2) {
                this.tituloModal = "Modificar Producto"
                this.id_producto = data._id;
                this.producto.descripcion = data.descripcion;
                this.producto.stock = data.stock;
                this.producto.stockMinimo = data.stockMinimo;
                this.producto.costo = data.costo;
                this.producto.precio = data.precio;
                this.producto.nombre = data.nombre;
                this.producto.codigo = data.codigo;
                const index = this.categorias.findIndex(x => x.nombre == data.nomCategoria)
                this.producto.nomCategoria = this.categorias[index].nombre

            } else if (this.modificar == 1) {
                this.tituloModal = "Registrar Producto"
                this.limpiarFormuralio();
            } else {
                this.tituloModal = "Detalle del Producto"
                this.id_producto = data._id;
                this.producto.descripcion = data.descripcion;
                this.producto.stock = data.stock;
                this.producto.stockMinimo = data.stockMinimo;
                this.producto.costo = data.costo;
                this.producto.precio = data.precio;
                this.producto.nombre = data.nombre;
                this.producto.codigo = data.codigo;
                const index = this.categorias.findIndex(x => x.nombre == data.nomCategoria)
                this.producto.nomCategoria = this.categorias[index].nombre
            }
        },
        /* 
            Autor: Deyvi Carlos Ramos Panaifo
            fecha: 22/10/2022
            función que permite a reestablecer al estado inicial las variables
        */
        limpiarFormuralio() {
            this.producto.descripcion = '';
            this.producto.precio = 0;
            this.producto.nomCategoria = '';
            this.producto.stock = 0;
            this.producto.stockMinimo = 0;
            this.producto.costo = 0;
            this.producto.nombre = '';
            this.producto.codigo = '';

        },
        /* 
            Autor: Gino Rubio Pacheco
            fecha: 21/11/2022
            función relacionada al CUS de Buscar Productos por código
        */
        buscar(codigo) {
            if (codigo) {
                let producto = []
                //instancia del servicio de producto
                const servicioproducto = new ServicioProducto()
                //se llama al metodo buscar productos
                servicioproducto.buscar(codigo).then(data => {
                    const response = data

                    if (response.status === 200) {
                        producto[0] = response.data
                        this.productos = producto
                    } else {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${response.message}!`,
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
