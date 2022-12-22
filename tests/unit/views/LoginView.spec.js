import { mount, shallowMount } from '@vue/test-utils'
import LoginView from '@/views/LoginView.vue'

describe('Test LoginView.vue',() => {

    it('Test entrada de datos', ()=>{
        const wrapper = mount(LoginView)

        console.log(wrapper.vm)

    })


})