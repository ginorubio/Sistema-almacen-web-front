<template>
    <Transition name="modal">
        <div v-if="show" class="modal" :class="{mostrar: show} ">
            <!--Modal pequeño-->
            <div class="modal-dialog" :class="tamanio" v-if="tamanio">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="header">default header</slot>
                        <button type="button" class="close" @click.prevent="$emit('close')"
                            data-dismiss="modal">&times;</button>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click.prevent="$emit('close')">Cancelar</button>
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
            <!--Modal Grande-->
            <div class="modal-dialog" v-else>
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="header">default header</slot>
                        <button type="button" class="close" @click.prevent="$emit('close')"
                            data-dismiss="modal">&times;</button>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click.prevent="$emit('close')">Cancelar</button>
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script>


export default {
    props: {
        show: Boolean,
        tamanio: {
            type: String,
            default: null,
        }

    }

}
</script>
<style scoped>
.mostrar {
    display: list-item;
    opacity: 1;
    background: rgba(44, 38, 0, 0.849);
    overflow-y: auto;
}
</style>