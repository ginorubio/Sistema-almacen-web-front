<template>
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 v-if="title">
                        <i :class="icon" v-if="icon" aria-hidden="true"></i>
                        {{title}}
                    </h1>
                </div>
 
            </div>
        </div><!-- /.container-fluid -->
    </section>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: null,
            },
            icon: {
                type: String,
                default: null,
            }
        },
        beforeMount(){
            //se asigna el titulo guardado desde el state de la aplicacion a la variable title
            let title = this.$store.state.app.name;
            title = this.title ? `${this.title} | ${title}` : title;
            //se asigna el titulo en el navegador
            $('title').html(title);
        }
    }
</script>