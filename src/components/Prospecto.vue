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

            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td>Colegiatura</td>
                            <td class="text-right">{{ colegiatura  | to_currency_format }}</td>
                        </tr>
                        <tr>
                            <td>Colegiatura con descuento</td>
                            <td class="text-right">{{ colegiatura_con_descuento  | to_currency_format }}
                            </td>
                        </tr>
                        <tr>
                            <td>Inscripción</td>
                            <td class="text-right">{{ inscripcion  | to_currency_format }}</td>
                        </tr>
                        <tr>
                            <td>Inscripción con descuento</td>
                            <td class="text-right">{{ inscripcion_con_descuento  | to_currency_format }}
                            </td>
                        </tr>
                        <tr>
                            <td>Examen de Admisión</td>
                            <td class="text-right">{{ examen_de_admision  | to_currency_format }}</td>
                        </tr>
                        <tr>
                            <td>Forma de pago</td>
                            <td class="text-right">{{ forma_de_pago }}</td>
                        </tr>
                        <tr>
                            <td><b>Total</b></td>
                            <td class="text-right"><b>{{ total  | to_currency_format }}</b></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
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
            nombre: this.prospecto.nombre,
            apellidos: this.prospecto.apellidos,
            telefono: this.prospecto.telefono,
            correo: this.prospecto.correo,
            colegiatura: this.prospecto.colegiatura,
            colegiatura_con_descuento: this.prospecto.colegiatura_con_descuento,
            inscripcion: this.prospecto.inscripcion,
            inscripcion_con_descuento: this.prospecto.inscripcion_con_descuento,
            examen_de_admision: this.prospecto.examen_de_admision,
            forma_de_pago: this.prospecto.forma_de_pago,
            total: this.prospecto.total
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