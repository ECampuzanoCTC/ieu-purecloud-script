<template>
    <v-card>
        <v-card-text class="pb-2">
            <p class="mb-0">Contacto</p>
            <!-- Informacion de contacto -->
            <h3 class="text--primary mb-1">{{ nombre }} {{ apellidos }}</h3>
            <p class="mb-0">
                <v-icon small>mdi-phone</v-icon> &nbsp;&nbsp;
                {{ telefono }}
            </p>
            <p>
                <v-icon small>mdi-email</v-icon>
                {{ correo }}
            </p>
            <!-- END Información de contacto-->


            <!-- <p class="light-blue--text text--darken-2 d-inline mr-6">
                <v-icon class="light-blue--text text--darken-2" small>mdi-gender-male-female</v-icon>
                Masculino
            </p>
            <p class="light-green--text text--darken-1 d-inline-block mb-0">
                <v-icon class="light-green--text text--darken-1" small>mdi-ring</v-icon>
                Soltero
            </p> -->

        </v-card-text>
        <v-card-actions>
            <v-btn target="_blank" :href="get_link" text color="deep-purple accent-4">Ver en Salesforce</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "contacto-card",
    props: [
        'contacto'
    ],
    data(){
        return {
            id: this.contacto.id,
            nombre: this.contacto.nombre,
            apellidos: this.contacto.apellidos,
            telefono: this.contacto.telefono,
            correo: this.contacto.correo
        }
    },
    computed:{
        get_link(){
            return "https://ieu--qa.lightning.force.com/" + this.id
        }
    }
}
</script>
<style lang="scss" scoped>

</style>