import { flushPromises, mount, shallowMount } from '@vue/test-utils'



//se describe el componente a testear
const UserManagementComponent = {
    data() {
        return {
            usuarios: [],
            usuario: {
                username: '',
                email: '',
                dni: '',
                password: '',
                repassword: '',
                passwordNE: '',
                roles: '',
                estado: ''

            },
            data_estado: [
                "habilitado", "inhabilitado"
            ],
            activeUsuariosHabilitados: true,
            activeUsuarioInhabilitados: false,
            cadena_buscar: '',
            showModal: false,
            id_usuario: 0,
            modificar: 0,
            tituloModal: '',
            usuariosPaginados: [],
            data_roles: [
                { nombre: "almacenero", codigo: "63636e8e8d3546d90542ad6a" },
                { nombre: "admin", codigo: "63636e8e8d3546d90542ad67" },
                { nombre: "jefe_almacen", codigo: "63636e8e8d3546d90542ad69" },
            ],

        }
    },
    template: `
                <div class="row">
                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label  for="nombre">NOMBRE</label>
                            <input data-test="tNombre"  type="text" class="form-control"
                                v-model="usuario.username"/>
                        
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="dni">DNI</label>
                            <input data-test="tDni" v-if="modificar == 2" disabled class="form-control" type="text"
                                v-model="usuario.dni" />
                            <input data-test="tDni" v-else class="form-control" type="text" placeholder="Digite el dni"
                                v-model="usuario.dni" />
                        </div>

                    </div>


                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="email">CORREO</label>
                            <input data-test="tCorreo" v-if="modificar == 3" disabled class="form-control" type="email"
                                v-model="usuario.email" />
                            <input data-test="tCorreo" v-else class="form-control" type="email" placeholder="Digite el correo"
                                v-model="usuario.email" />
                        </div>

                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="contrasena">CONTRASEÑA</label>
                            <input data-test="tContra" v-if="modificar == 3" disabled class="form-control" type="password"
                                v-model="usuario.password" />
                            <input data-test="tContra" v-else class="form-control" type="password" placeholder="Digite la contraseña"
                                v-model="usuario.password" />
                        </div>
                    </div>

                    <div v-if="modificar != 3" class="col-12 mb-2">
                        <div class="form-group">
                            <label for="contrasena">REPETIR CONTRASEÑA</label>
                            <input data-test="tRepContra" class="form-control" type="password" placeholder="Repetir la contraseña"
                                v-model="usuario.repassword" />
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label for="rol">ROL</label>
                            <select data-test="tRol" v-if="modificar == 3" disabled id="rol" name="rol" class="form-control"
                                v-model="usuario.roles">
                                <option disabled selected value="">--Seleccione un rol--</option>
                                <option v-for="rol in data_roles">{{ rol.nombre }}</option>
                            </select>
                            <select data-test="tRol" v-else id="rol" name="rol" class="form-control" v-model="usuario.roles">
                                <option disabled selected value="">--Seleccione un rol--</option>
                                <option v-for="rol in data_roles">{{ rol.nombre }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-12 mb-2">
                        <div class="form-group">
                            <label v-if="modificar == 3" for="estado">ESTADO</label>
                            <select data-test="tEstado" v-if="modificar == 3" disabled id="estado" name="estado" class="form-control"
                                v-model="usuario.estado">
                                <option disabled selected value="">--Seleccione un estado--</option>
                                <option v-for="estado in data_estado">{{ estado }}</option>
                            </select>
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
                            <th scope="col">ID</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">DNI</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">ROL</th>
                            <th scope="col">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="usuario in usuarios" :key="usuario._id" data-test="usuario-item">
                            <td>{{ usuario._id }}</td>
                            <td data-test="usuario-nombre">{{ usuario.username }}</td>
                            <td>{{ usuario.dni }}</td>
                            <td>{{ usuario.email }}</td>
                            <td v-if="usuario.roles == '63636e8e8d3546d90542ad6a'">{{ data_roles[0].nombre }}</td>
                            <td v-else="usuario.roles == '63636e8e8d3546d90542ad67'">{{ data_roles[1].nombre }}</td>
                            <td v-else="usuario.roles == '63636e8e8d3546d90542ad69'">{{ data_roles[2].nombre }}</td>
                            <td>
                                <button v-if="false" @click="showModal = true; modificar = 3; abrirModal(usuario)"
                                    class="btn btn-info mr-2"><i class="fa fa-eye" aria-hidden="true"></i></button>
                                <button v-if="usuario.estado != 'inhabilitado'"
                                    @click="showModal = true; modificar = 2; abrirModal(usuario)"
                                    class="btn btn-success mr-2"><i class="far fa-edit" aria-hidden="true"></i></button>
                                <button v-if="false" type="button"  class="btn btn-danger"><i
                                        class="fa fa-eye-slash" aria-hidden="true"></i></button>
                                <button v-if="usuario.estado != 'habilitado'" type="button"
                                    class="btn btn-primary mr-2"><i class="fas fa-arrow-up" aria-hidden="true"></i></button>
                                <button v-if="usuario.estado != 'inhabilitado'" type="button"
                                    class="btn btn-danger "><i class="fas fa-arrow-down" aria-hidden="true"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    methods: {
        guardar(){
            this.usuarios.push(this.usuario)
            
        }

    },

}


describe('UserManagementComponent Test', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallowMount(UserManagementComponent, {
            data() {
                return {
                    usuario: {
                        username: '',
                        email: '',
                        dni: '',
                        password: '',
                        repassword: '',
                        passwordNE: '',
                        roles: '',
                        estado: ''
                    },
                    usuarios: [],
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
        expect(wrapper.vm.usuario.username).toBe('')
        expect(wrapper.vm.usuario.email).toBe('')
        expect(wrapper.vm.usuario.dni).toBe('')
        expect(wrapper.vm.usuario.password).toBe('')
        expect(wrapper.vm.usuario.repassword).toBe('')
        expect(wrapper.vm.usuario.passwordNE).toBe('')
        expect(wrapper.vm.usuario.roles).toBe('')
        expect(wrapper.vm.usuario.estado).toBe('')

    })

    test('Test para validar data de entrada', async () => {
        //datos esperados


        //datos obtenidos del componente
        await wrapper.setData({
            usuario: {
                username: 'Deyvi Carlos',
                email: 'deyvi@gmail.com',
                dni: '58479652',
                password: '12345',
                repassword: '12345',
                passwordNE: '',
                roles: 'jefe_almacen',
                estado: 'habilitado'
            }
        })

        await flushPromises()

        console.log(wrapper.vm.usuario)

        //evaluación
        expect(wrapper.vm.usuario.username).toBe('Deyvi Carlos')
        expect(wrapper.vm.usuario.email).toBe('deyvi@gmail.com')
        expect(wrapper.vm.usuario.dni).toBe('58479652')
        expect(wrapper.vm.usuario.password).toBe('12345')
        expect(wrapper.vm.usuario.repassword).toBe('12345')
        expect(wrapper.vm.usuario.passwordNE).toBe('')
        expect(wrapper.vm.usuario.roles).toBe('jefe_almacen')
        expect(wrapper.vm.usuario.estado).toBe('habilitado')

    })
    test('renderizar datos de usuarios en tabla', async () => {
        
        console.log(wrapper.html())

        expect(wrapper.findAll('[data-test="usuario-item"]')).toHaveLength(0)

        
        await wrapper.get('[data-test="tNombre"]').setValue('Deyvi Ramos')
        await wrapper.get('[data-test="tDni"]').setValue('45216325')
        await wrapper.get('[data-test="tCorreo"]').setValue('deyvi.r@gmail.com')
        await wrapper.get('[data-test="tContra"]').setValue('152634')
        await wrapper.get('[data-test="tRepContra"]').setValue('152634s')
        await wrapper.get('[data-test="tRol"]').setValue('jefe_almacen')
        
        await wrapper.get('[data-test="guardar"]').trigger('click')
        console.log(wrapper.html())

        expect(wrapper.findAll('[data-test="usuario-item"]')).toHaveLength(1)


    })
    /*
    let wrapper = null

    beforeEach (()=>{
        wrapper = shallowMount(UserManagement, {
            propsData: {
                usuario: {
                    username: '',
                    email: '',
                    dni: '',
                    password: '',
                    repassword: '',
                    roles: '',
                    estado: ''
                }
            }
        })
    })

    afterEach(() =>{
        wrapper.unmount()
    })
    */
    // it('renders default usuario', async () => {
    //     //arrange
    //     const wrapper = mount(UserManagement)

    //     //Act


    //     //Assert
    //     expect(wrapper.findAll('[data-test="usuario-nombre"]')).toHaveLength(1)

    //      //Act
    //     await wrapper.get('[data-test="nombre"]').setValue('')
    //     await wrapper.get('[data-test="guardar"]').trigger('click')

    //     //Assert
    //     expect(wrapper.findAll('[data-test="usuario-nombre"]')).toHaveLength(2)

    // })
    /*
    it('initializes with correct elements',() =>{

    })*/

    // it('processes valid desactive activeUsuariosHabilitados', async () =>{
    //     const wrapper = shallowMount(UserManagement)

    //     console.log("userComponente: " + wrapper.vm)

    //     //valor inicial
    //     expect(wrapper.vm.activeUsuariosHabilitados).toBe(true)

    //     wrapper.vm.mostrarUsuarioInhabilitados();

    //     expect(wrapper.vm.activeUsuariosHabilitados).toBe(false)
    // })
    /*
    it('emits a custom event when the clear Data button is clicked',()=>{

    })*/
    // it('data', ()=> {
    //     const wrapper = mount(UserManagement,{
    //         data(){
    //             return {
    //                 usuario:{
    //                     username: '',

    //                 }
    //             }
    //         }
    //     })

    //     expect(wrapper.vm.usuario.username).toMatch('Carlos Ramos')
    // })

})

