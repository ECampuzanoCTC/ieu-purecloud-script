<template>
    <v-card tile>
        <v-card-text class="pb-2">
            <p class="mb-0">Oportunidad</p>
            <!-- Informacion de contacto -->
            <h3 class="text--primary mb-1">{{ nombre }}</h3>
            <p class="mb-0">
                <v-icon small>mdi-phone</v-icon> &nbsp;&nbsp;
                {{ telefono }}
            </p>
            <p>
                <v-icon small>mdi-email</v-icon>
                {{ correo }}
            </p>
            <!-- END Información de contacto-->
            <span class="font-weight-black">Propietario: 
                
                <a :href="get_owner_link" class="indigo--text mb-0">
                    {{ owner.nombre }}
                </a>
            </span>  
            <p v-if="fecha_creacion" class="mb-0">
                <span class="font-weight-black">Fecha de creación: </span>  
                {{ fecha_creacion | format_date }}
            </p>
            
        </v-card-text>
        <oportunidad-inner-card 
        v-if="oferta_educativa && grupo"
        :oferta_educativa="oferta_educativa" :grupo="grupo"/>
        <v-card-actions>
            <v-btn target="_blank" :href="get_link" text color="deep-purple accent-4">Ver en Salesforce</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import InnerCard from '@/components/OportunidadInnerCard';

export default {
    name: "oportunidad-card",
    components: {
        "oportunidad-inner-card": InnerCard
    },
    props: [
        'oportunidad'
    ],
    data(){
        return {
            id: this.oportunidad.id,
            owner: this.oportunidad.owner,
            fecha_creacion: this.oportunidad.fecha_creacion,
            nombre: this.oportunidad.nombre,
            telefono: this.oportunidad.telefono,
            correo: this.oportunidad.correo,
            oferta_educativa: this.oportunidad.oferta_educativa,
            grupo: this.oportunidad.grupo
        }
    },
    filters:{
        format_date(date){
            let d = new Date(date);
            let num_date = d.getUTCDate();
            let num_month = d.getUTCMonth() + 1;
            let num_year = d.getUTCFullYear();

            return `${num_date}/${num_month}/${num_year}`;        
        }
    },
    computed:{
        get_link(){
            return "https://ieu--qa.lightning.force.com/" + this.id;
        },
        get_owner_link(){
            return "https://ieu--qa.lightning.force.com/" + this.owner.id;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>