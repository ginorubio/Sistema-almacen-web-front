<template>
    <!--Data table prueba-->
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h3 class="card-title">DataTable</h3>
            <div>
                <slot name="button_buscar"></slot>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" aria-label="tabla-description">
                    <thead>
                        <slot name="thead"></slot>
                    </thead>
                    <tbody>
                        <slot name="tbody"></slot>
                    </tbody>
                </table>
                <!--Paginacion-->
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        <li :class="{ disabled: page == 1 }" class="page-item ">
                            <button @click="page--; listaPaginada()" class="page-link">Anterior</button>
                        </li>
                        <li v-for="pageNumber in pages" :key="pageNumber" class="page-item ">
                            <button @click="page = pageNumber ; listaPaginada()" class="page-link">{{ pageNumber
                            }}</button>
                        </li>
                        <li :class="{ disabled: page >= pages.length }" class="page-item ">
                            <button @click="page++; listaPaginada()" class="page-link">Siguiente</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        lista: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            page: 1,
            perPage: 10,
            pages: []
        }
    },
    watch: {
        lista() {
            this.setlista();
        }
    },
    methods: {
        listaPaginada() {
            //se emite el evento creado por el componente padre
            console.log("Lista enviada: "+this.lista[0])
            this.$emit('getValues', this.paginate(this.lista))
        },
        paginate(lista) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return lista.slice(from, to)
        },
        setlista() {
            this.pages = []
            let numberOfpages = Math.ceil(this.lista.length / this.perPage)
            for (let i = 1; i <= numberOfpages; i++) {
                this.pages.push(i);
            }
            this.listaPaginada();

        },
    }
}
</script>
