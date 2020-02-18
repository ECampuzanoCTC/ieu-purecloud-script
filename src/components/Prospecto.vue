<template>
    <v-card tile>
        <v-card-text class="pb-2">
            <p class="mb-0">Prospecto</p>
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
            <a :href="`https://ieu--qa--c.cs16.visual.force.com/${owner.Id}`" class="indigo--text mb-0">
                <span class="font-weight-black">Creador: </span>  
                {{ owner.nombre }}
            </a>
            <p class="mb-0">
                <span class="font-weight-black">Fecha de creación: </span>  
                {{ fecha_creacion | format_date }}
            </p>
            
        </v-card-text>
        <prospecto-inner-card 
        v-if="oferta_educativa && grupo"
        :oferta_educativa="oferta_educativa" :grupo="grupo"/>
        <v-card-actions>
            <v-btn target="_blank" :href="get_link" text color="deep-purple accent-4">Ver en Salesforce</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import InnerCard from '@/components/ProspectoInnerCard';

export default {
    name: "prospecto-card",
    components: {
        "prospecto-inner-card": InnerCard
    },
    props: [
        'prospecto'
    ],
    data(){
        return {
            id: this.prospecto.id,
            owner: this.prospecto.owner,
            fecha_creacion: this.prospecto.fecha_creacion,
            nombre: this.prospecto.nombre,
            apellidos: this.prospecto.apellidos,
            telefono: this.prospecto.telefono,
            correo: this.prospecto.correo,
            oferta_educativa: this.prospecto.oferta_educativa,
            grupo: this.prospecto.grupo
        }
    },
    filters:{

        to_currency_format(amount){
            let formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            })

            return formatter.format(amount);
        },
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
        }
    }
}
</script>
<style lang="scss" scoped>

</style>