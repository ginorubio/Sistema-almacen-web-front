<template>
    <content-header title="Categorias" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button v-if="$store.state.rol == 'jefe_almacen'" id="show-modal" type="button"
            @click.prevent="showModal = true, modificar = false; abrirModal()" class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2" aria-hidden="true"></i> Nueva Categoría
        </button>
        <div class="d-flex justify-content-end">
            <div>
                <div class="habilidados" :class="{ estadoactivo: activeCategoriaHabilitados }">
                    <button type="button" @click="activeCategoriaHabilitados = true; mostrarCategorias()">
                        <i class="fas fa-circle mr-2" aria-hidden="true"></i> <strong>Habilitados</strong>
                    </button>
                </div>
                <div class="inhabilitados" :class="{ estadoinhabilitado: activeCategoriaInhabilitados }">
                    <button type="button"
                        @click="activeCategoriaInhabilitados == true, mostrarCategoriasInhabilitados()">
                        <i class="fas fa-circle mr-2" aria-hidden="true"></i> <strong>Deshabilitados</strong>
                    </button>
                </div>
            </div>

        </div>
    </div>
    <!-- 
        Autor: Aldo Ramirez
        fecha: 05/10/2022

        Modal para el resgistro, descripcion y edicion de la categoria
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
                            <label>Código</label>
                            <div class="d-flex">
                                <div v-if="!modificar" class="d-flex codigo-inicio">
                                    <p>C</p>
                                </div>
                                <input v-if="!modificar" type="text" class="form-control"  placeholder="Digite el codigo" v-model="categoria.codigo">
                                <input v-else disabled type="text" class="form-control" v-model="categoria.codigo">
                            </div>
                        </div>
                        <div class="text-danger" v-if="v$.categoria.codigo.$error && !modificar">
                            {{ v$.categoria.codigo.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <textarea v-if="!modificar" class="form-control" id="nombre" placeholder="Digite el nombre" v-model="categoria.nombre"
                                style="height: 100px"></textarea>
                            <textarea v-else disabled class="form-control" id="nombre"  v-model="categoria.nombre"
                                style="height: 100px"></textarea>
                        </div>
                        <div class="text-danger" v-if="v$.categoria.nombre.$error">
                            {{ v$.categoria.nombre.$errors[0].$message }}
                        </div>
                    </div>

                </div>
            </template>
            <template #footer>
                <button @click.prevent="guardar()" type="button" class="btn btn-success">Guardar</button>
            </template>
        </modal>
    </teleport>
    <content>
         <!-- 
            Autor: Aldo Ramirez
            fecha: 05/10/2022

            Tabla de la lista de categorias
        -->
        <data-table :lista="categorias" @getValues="setValues">

            <template #button_buscar>
                <label class="mr-2" for="">BUSCAR:</label>
                <input class="rounded-pill input-buscar-datatable" type="search" placeholder="Buscar por nombre" v-model="cadena_buscar">
                <button class="btn btn-primary" @click="buscar(cadena_buscar)"><i class="fas fa-search"
                        aria-hidden="true"></i></button>
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
                        <button v-if="false"
                            @click="showModal = true; modificar = true; abrirModal(categoria)"
                            class="btn btn-success mr-2"><i class="far fa-edit" aria-hidden="true"></i></button>
                        <button v-if="categoria.estado != 'habilitado' && $store.state.rol == 'jefe_almacen'" type="button"
                            @click="ascenderCategoria(categoria)" class="btn btn-primary mr-2"><i
                                class="fas fa-arrow-up" aria-hidden="true"></i></button>
                        <button v-if="categoria.estado != 'inhabilitado' && $store.state.rol == 'jefe_almacen'" type="button"
                            @click="descenderCategoria(categoria)" class="btn btn-danger "><i class="fas fa-arrow-down"
                                aria-hidden="true"></i></button>
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
import { required, helpers, minLength, maxLength } from '@vuelidate/validators'

//expresion que solo admite letras de a-z y A-Z, incluido los espacios
const caracterValido = helpers.regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
//Expresion que solo admite digitos
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
                nombre: '',
                estado: ''
            },
            data_estado: ["habilitado", "inhabilitado"],
            activeCategoriaHabilitados: true,
            activeCategoriaInhabilitados: false,
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
            /* 
                Autor: Aldo Ramirez
                fecha: 05/10/2022
                validaciones de los campos del producto usando el VueValidate 
            */
            categoria: {
                //validaciones para el campo de codigo
                codigo: {
                    required: helpers.withMessage('El campo es requerido', required),
                    number: helpers.withMessage('Solo admite números ', numberValido),
                    minLength: helpers.withMessage('El número de dígitos es 5', minLength(5)),
                    maxLength: helpers.withMessage('El número de dígitos es 5', maxLength(5))
                },
                //validaciones para el campo de nombre
                nombre: {
                    required: helpers.withMessage('El campo es requerido', required),
                    minLength: helpers.withMessage('El mínimo número de caracteres es 3', minLength(3)),
                    caracteres: helpers.withMessage('Caracter no valido', caracterValido),
                    maxLength: helpers.withMessage('El máximo número de caracteres es 30', maxLength(30))
                }
            }
        }
    },
    methods: {
        setValues(obj) {
            //retorno de la lista paginada
            this.categoriasPaginadas = obj;
        },
        /* 
            Autor: Deyvi Ramos Panaifo
            fecha: 25/10/2022
            función relacionada al CUS de Listar Categorias Habilitadas
        */
        mostrarCategorias() {
            this.activeCategoriaHabilitados = true;
            this.activeCategoriaInhabilitados = false;
            //instancia del servicio
            const serviciocategorias = new ServicioCategorias()
            //se llama al metodo mostrar categorias
            serviciocategorias.mostrar().then(data => {
                const response = data

                if (response.status === 200) {
                    this.categorias = response.data;
                } else {
                    console.log(error)
                }

            }, error => {
                console.log(error)
            })
        },
        /* 
            Autor: Aldo Ramirez
            fecha: 25/10/2022
            función relacionada al CUS de Listar Categorias inhabilitadas
        */
        mostrarCategoriasInhabilitados() {
            this.activeCategoriaHabilitados = false;
            this.activeCategoriaInhabilitados = true;
            //instancia del servicio usuarios
            const serviciocategorias = new ServicioCategorias()
            //se llama al metodo mostrar usuarios inhabilitados
            serviciocategorias.mostrarInhabilitados().then(data => {
                const response = data
                if (response.status === 200) {
                    this.categorias = response.data;
                } else {
                    console.log(error)
                }
            }, error => {
                console.log(error)
            })
        },
        /* 
            Autor: Aldo Ramirez
            fecha: 05/11/2022
            función relacionada al CUS de descender categoria
        */
        descenderCategoria(categoria) {

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
                text: `Se dará de baja a la categoría ${categoria.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //instancia del servicio de categorias
                    const serviciocategorias = new ServicioCategorias()
                    //se llama al metodo eliminar categorias
                    serviciocategorias.descenderCategoria(categoria._id).then(data => {
                        const response = data
                        if (response.status == 200) {
                            alertEliminar.fire(
                                'Se dio de baja!',
                                `La categoría ${categoria.nombre} fue dada de baja.`,
                                'success'
                            )
                            this.mostrarCategorias();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `La categoría ${categoria.nombre} no se pudo dar de baja.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `La categoría ${categoria.nombre} no se pudo dar de baja.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `La categoría ${categoria.nombre} no fue dar de baja.`,
                        'error'
                    )
                }
            })
        },
        /* 
            Autor: Aldo Ramirez
            fecha: 05/11/2022
            función relacionada al CUS de ascender categoria
        */
        ascenderCategoria(categoria) {

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
                text: `Se dar de alta a la categoría ${categoria.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    //instancia del servicio de categorias
                    const serviciocategorias = new ServicioCategorias()
                    //se llama al metodo eliminar categorias
                    serviciocategorias.ascenderCategoria  (categoria._id).then(data => {
                        const response = data
                        if (response.status == 200) {
                            alertEliminar.fire(
                                'Se dio de alta!',
                                `La categoría ${categoria.nombre} fue dada de alta.`,
                                'success'
                            )
                            this.mostrarCategorias();
                        } else {
                            alertEliminar.fire(
                                'Cancelado',
                                `La categoría ${categoria.nombre} no se pudo dar de alta.`,
                                'error'
                            )
                        }
                    }, error => {
                        alertEliminar.fire(
                            'Cancelado',
                            `La categoría ${categoria.nombre} no se pudo dar de alta.`,
                            'error'
                        )
                    })

                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    alertEliminar.fire(
                        'Cancelado',
                        `La categoría ${categoria.nombre} no se pudo dar de alta.`,
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
                    //instancia del servicio de categorias
                    const serviciocategorias = new ServicioCategorias()
                    //se llama al metodo modificar categorias
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
                    /* 
                        Autor: Aldo Ramirez
                        fecha: 22/10/2022
                        función relacionada al CUS de Registar Categoria
                    */
                    this.categoria.codigo = "C" + this.categoria.codigo;
                    //instancia del servicio de categorias
                    const serviciocategorias = new ServicioCategorias()
                    //se llama al metodo registrar categorias
                    serviciocategorias.registrar(this.categoria).then(data => {
                        const response = data
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
        /* 
            Autor: Deyvi Carlos Ramos Panaifo
            fecha: 22/10/2022
            función que permite a activar un modal donde se vizualizaran
            los campos de la categoria
        */
        abrirModal(data = {}) {
            if (this.modificar) {
                this.tituloModal = "Modificar Categoria"
                this.id_categoria = data._id;
                this.categoria.codigo = data.codigo;
                this.categoria.nombre = data.nombre;
                this.categoria.estado = data.estado;
            } else {
                this.tituloModal = "Registrar Categoria"
                this.limpiarFormuralio();
            }
        },
        /* 
            Autor: Deyvi Carlos Ramos Panaifo
            fecha: 22/10/2022
            función que permite a reestablecer al estado inicial las variables
        */
        limpiarFormuralio() {
            this.categoria.nombre = '';
            this.categoria.codigo = '';
            this.categoria.estado = '';
        },
        /* 
            Autor: Aldo Ramirez
            fecha: 30/10/2022
            función relacionada al CUS de Buscar Categoria por nombre
        */
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
<style>
.codigo-inicio {
    height: 38px;
    background: rgb(58, 64, 119);
    color: #fff;
}

.codigo-inicio p {
    margin-top: 8px;
    margin-right: 4px;
    margin-left: 4px;
}
</style>