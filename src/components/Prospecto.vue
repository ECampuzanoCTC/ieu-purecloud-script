<template>
    <v-card tile>
        <v-card-text class="pb-2">
            <p class="mb-0">Prospecto</p>
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

            
        </v-card-text>
        <v-card class="ml-2 mr-2" tile outlined>
            <v-card-text>
                <p class="overline text--primary mb-2 font-weight-bold">Oferta educativa</p>
                <h3 class="light-blue--text  mb-2">
                        {{ programa }}
                </h3>
                <!-- Fechas --->
                <p class="mb-1">
                    <span class="font-weight-black">
                        Inicio de clases:
                    </span>&nbsp;
                    {{ fecha_inicio_clases }}
                </p>
                <!-- Fechas -->
                <p class="mb-1">
                    <span class="font-weight-black ">
                        Plantel:
                    </span>&nbsp;
                    {{ plantel }}
                </p><p class="mb-1">
                    <span class="font-weight-black">
                        Periodo:
                    </span>&nbsp;
                    {{ programa }}
                </p><p class="mb-1">
                    <span class="font-weight-black">
                        Nivel:
                    </span>&nbsp;
                    {{ nivel }}
                </p>
                <p class="mb-1">
                    <span class="font-weight-black">
                        Etapa:
                    </span>&nbsp;
                    {{ etapa }}
                </p>
                <p class="mb-2">
                    <span class="font-weight-black">
                        Estatus:
                    </span>&nbsp;
                    {{ estatus }}
                </p>
                
                <br />
                <p class="overline indigo--text text--primary mb-2 font-weight-bold">Grupo</p>
                <h3 class="light-green--text mb-2">
                        {{ grupo }}
                </h3>
                <p class="mb-1">
                    <span class="font-weight-black">
                        Fecha de apertura:
                    </span>&nbsp;
                    {{ fecha_apertura_grupo }}
                </p>
            </v-card-text>
        </v-card>
        <v-card-actions>
            <v-btn target="_blank" href="/" text color="deep-purple accent-4">Ver en Salesforce</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "prospecto-card",
    props: [
        'prospecto'
    ],
    data(){
        return {
            owner: this.prospecto.owner,
            fecha_de_creacion: this.prospecto.fecha_de_creacion,
            nombre: this.prospecto.nombre,
            apellidos: this.prospecto.apellidos,
            telefono: this.prospecto.telefono,
            correo: this.prospecto.correo,
            programa: this.prospecto.programa,
            nivel: this.prospecto.nivel,
            plantel: this.prospecto.plantel,
            periodo: this.prospecto.periodo,
            fecha_inicio_clases: this.prospecto.fecha_inicio_clases,
            grupo: this.prospecto.grupo,
            fecha_apertura_grupo: this.prospecto.fecha_apertura_grupo,
            etapa: this.prospecto.etapa,
            estatus: this.prospecto.estatus
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
        }
    }
}
</script>
<style lang="scss" scoped>

</style>