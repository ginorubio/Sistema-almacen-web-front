<template>
    <content-header title="Movimientos" />
    <div class="col-12 mb-2">
        <!-- Button to Open the Modal -->
        <button id="show-modal" type="button" @click.prevent="showModal=true, modificar=false; abrirModal()"
            class="btn btn-primary">
            <i class="fas fa-plus-circle mr-2"></i> Nuevo Movimiento
        </button>
    </div>
    <!-- Modal para agregar los movimientos -->
    <teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false" tamanio="modal-xl">
            <template #header>
                <h3>{{tituloModal}}</h3>
            </template>
            <template #body>

                <div class="row">
                    <div class="col-sm mb-2">
                        <div class="form-group">
                            <label>N° Documento</label>
                            <input type="text" class="form-control" v-model="movimiento.codigo">
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
                            <label for="almacen">Almacen</label>
                            <input type="text" class="form-control" v-model="movimiento.almacen" />
                        </div>
                    </div>

                    <div class="col-sm mb-2">
                        <div class="form-group">
                            <label for="tipo">Tipo</label>
                            <select class="form-control" v-model="movimiento.tipo">
                                <option disabled selected value="">--Seleccione un tipo--</option>
                                <option v-for="tipo in tipos">{{tipo}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-sm-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="proveedor">Proveedor</label>
                            <input type="text" class="form-control" v-model="movimiento.proveedor" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <button @click.prevent="showModal1=true " type="text" class="btn btn-primary"><i
                                    class="fas fa-plus-circle"></i>Agregar Producto</button>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead class="bg-secondary text-white">
                                    <tr>
                                        <th>ID</th>
                                        <th>DESCRIPCION</th>
                                        <th>UNIDAD</th>
                                        <th>CANTIDAD</th>
                                        <th>STOCKACTUAL</th>
                                        <th>COSTO</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>21565001</td>
                                        <td>borrador faber castell</td>
                                        <td>unidad</td>
                                        <td>30</td>
                                        <td>156</td>
                                        <td>1.5</td>
                                        <td>
                                            <button class="btn btn-success mr-1"><i class="far fa-edit"></i></button>
                                            <button type="button" class="btn btn-danger"><i
                                                    class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>215565001</td>
                                        <td>Lapicero faber castell</td>
                                        <td>unidad</td>
                                        <td>50</td>
                                        <td>200</td>
                                        <td>2.0</td>
                                        <td>
                                            <button class="btn btn-success mr-1"><i class="far fa-edit"></i></button>
                                            <button type="button" class="btn btn-danger"><i
                                                    class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

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
    <!-- Modal para agregar producto a los movimientos -->
    <teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal1" @close="showModal1 = false" tamanio="modal-lg">
            <template #header>
                <h3>{{tituloModalProducto}}</h3>
            </template>
            <template #body>

                <div class="row">
                    <div class="col mb-2">
                        <div class="form-group">
                            <label>Código</label>
                            <input type="text" class="form-control " />

                        </div>
                    </div>
                    <div class="col mb-2 d-flex align-items-end">
                        <div class="form-group" >
                            <button type="button" class="btn btn-primary" data-dismiss="modal"><i
                                    class="fa fa-search mr-2"></i>Buscar</button>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-descripcion">Descripcion</label>
                            <input type="text" class="form-control" />
                        </div>
                    </div>

                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-stock-actual">Stock Actual</label>
                            <input type="number" value="0" class="form-control" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-unidad">Unidad</label>
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-costo">Costo</label>
                            <input type="number" value="0" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 mb-2">
                        <div class="form-group">
                            <label for="detalle-cantidad">Cantidad</label>
                            <input type="number" value="0" class="form-control" />
                        </div>
                    </div>
                </div>

            </template>
            <template #footer>
                <button type="button" class="btn btn-success" data-dismiss="modal">Agregar</button>
            </template>
        </modal>
    </teleport>
    <content>
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="bg-secondary text-white">
                            <tr>
                                <th>ID</th>
                                <th>FECHA</th>
                                <th>CANTIDAD</th>
                                <th>TIPO</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>M001</td>
                                <td>03/05/2022</td>
                                <td>62</td>
                                <td>Salida</td>
                                <td>
                                    <button class="btn btn-info mr-2"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-success mr-2"><i class="far fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger mr-2"><i
                                            class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>M002</td>
                                <td>03/05/2022</td>
                                <td>62</td>
                                <td>Salida</td>
                                <td>
                                    <button class="btn btn-info mr-2"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-success mr-2"><i class="far fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger mr-2"><i
                                            class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>M003</td>
                                <td>03/05/2022</td>
                                <td>62</td>
                                <td>Salida</td>
                                <td>
                                    <button class="btn btn-info mr-2"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-success mr-2"><i class="far fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger mr-2"><i
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


export default {
    components: {
        ContentHeader, Content, Modal
    },
    data() {
        return {
            cabecera: '',
            movimietos: [],
            movimiento: {
                codigo: '',
                almacen: '',
                proveedor: '',
                fecha: '',
                tipo: '--Seleccione un tipo--',
                productos: []
            },
            showModal: false,
            showModal1: false,
            id_movimiento: 0,
            modificar: true,
            tituloModal: '',
            tituloModalProducto: 'Producto',
            tipos: ["Entrada", "Salida"]

        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        abrirModal(data = {}) {
            if (this.modificar) {
                this.tituloModal = "Modificar Movimiento"
                this.id_movimiento = data.codigo;
                this.movimiento.codigo = data.codigo;
                this.movimiento.almacen = data.almacen;
                this.movimiento.proveedor = data.proveedor;
                this.movimiento.fecha = data.fecha;
                this.movimiento.tipo = data.tipo;
                this.movimiento.productos = data.productos;

            } else {
                this.tituloModal = "Registrar Movimiento"
                this.limpiarFormuralio();
            }
        },
        limpiarFormuralio() {
            this.movimiento.codigo = '';
            this.movimiento.almacen = '';
            this.movimiento.proveedor = '';
            this.movimiento.fecha = '';
            this.movimiento.tipo = '';
            this.movimiento.productos = [];
        }
    },
    created() {

    }
}
</script>
<style scoped>

</style>