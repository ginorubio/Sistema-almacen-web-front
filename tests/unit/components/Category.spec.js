import { flushPromises, mount, shallowMount } from '@vue/test-utils'


//se describe el componente a testear
const CategoryComponent = {
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
    template: `
        <div class="row">
            <div class="col-12 mb-2">
                <div class="form-group">
                    <label>Código</label>
                    <div class="d-flex">
                        <div v-if="!modificar" class="d-flex codigo-inicio">
                            <p>C</p>
                        </div>
                        <input data-test="tCodigo" v-if="!modificar" type="text" class="form-control"  placeholder="Digite el codigo" v-model="categoria.codigo">
                        <input data-test="tCodigo" v-else disabled type="text" class="form-control" v-model="categoria.codigo">
                    </div>
                </div>
            </div>

            <div class="col-12 mb-2">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <textarea data-test="tNombre" v-if="!modificar" class="form-control" id="nombre" placeholder="Digite el nombre" v-model="categoria.nombre"
                        style="height: 100px"></textarea>
                    <textarea data-test="tNombre" v-else disabled class="form-control" id="nombre"  v-model="categoria.nombre"
                        style="height: 100px"></textarea>
                </div>
            </div>

        </div>
        <button v-if="modificar != 3" @click.prevent="guardar()" data-test="guardar" type="button" class="btn btn-success"
            data-dismiss="modal">Guardar</button>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" aria-label="tabla-description">
                    <thead>
                    <tr>
                        <th scope="col">CÓDIGO</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">ACCIONES</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="categoria in categorias" :key="categoria._id" data-test="categoria-item">
                            <td>{{ categoria.codigo }}</td>
                            <td>{{ categoria.nombre }}</td>
                            <td>
                                <button   type="button"
                                    @click="ascenderCategoria(categoria)" class="btn btn-primary mr-2"><i
                                        class="fas fa-arrow-up" aria-hidden="true"></i></button>
                                <button  type="button"
                                    @click="descenderCategoria(categoria)" class="btn btn-danger "><i class="fas fa-arrow-down"
                                        aria-hidden="true"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    methods: {
        guardar(){
            this.categorias.push(this.categoria)
            
        }

    },
}


describe('CategoryComponent Test', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallowMount(CategoryComponent, {
            data() {
                return {
                    categoria: {
                        codigo: '',
                        nombre: '',
                        estado: ''
                    },
                    categorias: [],
                }
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })


    test('Test para validar data inicial', async () => {



        await flushPromises()

        //datos de entrada - datos esperados
        expect(wrapper.vm.categoria.codigo).toBe('')
        expect(wrapper.vm.categoria.nombre).toBe('')
        expect(wrapper.vm.categoria.estado).toBe('')

    })

    test('Test para validar data de entrada', async () => {
        //datos esperados


        //datos obtenidos del componente
        await wrapper.setData({
            categoria: {
                codigo: '15623',
                nombre: 'útiles escolares',
                estado: 'habilitado'
            }
        })

        await flushPromises()

        console.log(wrapper.vm.categoria)

        //evaluación
        expect(wrapper.vm.categoria.codigo).toBe('15623')
        expect(wrapper.vm.categoria.nombre).toBe('útiles escolares')
        expect(wrapper.vm.categoria.estado).toBe('habilitado')

    })
    test('renderizar datos de categoria en tabla', async () => {
        
        console.log(wrapper.html())

        expect(wrapper.findAll('[data-test="categoria-item"]')).toHaveLength(0)

        
        await wrapper.get('[data-test="tCodigo"]').setValue('16325')
        await wrapper.get('[data-test="tNombre"]').setValue('Útiles escolares')
     
        
        await wrapper.get('[data-test="guardar"]').trigger('click')
        console.log(wrapper.html())

        expect(wrapper.findAll('[data-test="categoria-item"]')).toHaveLength(1)


    })
})