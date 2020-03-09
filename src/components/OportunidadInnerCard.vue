<template>
    <v-card class="ml-2 mr-2" tile outlined >
        <v-card-text>
            <p class="overline text--primary mb-2 font-weight-bold">Oferta educativa</p>
            <h3 class="light-blue--text  mb-2">
                {{ oferta_educativa.programa }}
            </h3>
            
            <p class="mb-1">
                <span class="font-weight-black ">
                    Plantel:
                </span>&nbsp;
                {{ oferta_educativa.plantel }}
            </p>
            <p class="mb-1">
                <span class="font-weight-black">
                    Periodo:
                </span>&nbsp;
                {{ oferta_educativa.periodo }}
            </p>
            <p class="mb-1">
                <span class="font-weight-black">
                    Nivel:
                </span>&nbsp;
                {{ oferta_educativa.nivel }}
            </p>
            <p class="mb-1">
                <span class="font-weight-black">
                    Etapa:
                </span>&nbsp;
                {{ etapa || "alguna etapa" }}
            </p>
            <br />
            <p class="overline indigo--text text--primary mb-2 font-weight-bold">Grupo</p>
            <h3 class="light-green--text mb-2">
                {{ grupo.nombre }}
            </h3>
            <!-- Fechas --->
            <p class="mb-1">
                <span class="font-weight-black">
                    Inicio de clases:
                </span>&nbsp;
                {{ oferta_educativa.fecha_inicio_clases }}
            </p>
            <!-- Fechas -->
            <p class="mb-1">
                <span class="font-weight-black">
                    Fecha de apertura:
                </span>&nbsp;
                {{ grupo.fecha_apertura }}
            </p>
            <p class="mb-0">
                <span class="font-weight-black">
                    Estatus:
                </span>&nbsp;
            </p>
            <img data-v-80216714="" class="mb-2" :src="get_recurso_para_estatus" alt="alt">
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name: "oportunidad-inner-card",
    props:['grupo', 'oferta_educativa'],
    computed:{
        get_recurso_para_estatus(){
            let img_tag = this.oferta_educativa.estatus;
            let tmp_parted = img_tag.split('"');

            return tmp_parted[1];
        }
    }
}
</script>
<style lang="scss" scoped>

</style>