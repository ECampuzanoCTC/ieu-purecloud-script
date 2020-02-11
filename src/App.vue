<template>
  <v-app>
    <v-content>
      <v-container>
        <v-expansion-panels tile="true" multiple="true" :value="[0]" id="">
          <v-expansion-panel v-for="(panel, i) in paneles" :key="i">
            <v-expansion-panel-header color="#357673">
              <h3 class="white--text">{{ panel | capitalize_panel_name }} ({{ get_panel_length(panel) }})</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content 
            v-if="get_panel_length(panel) > 0"
            color="grey lighten-4" 
            class="pt-3 pb-3">
              <v-row v-for="(panel_row, row_index) in get_panel_rows(panel)" :key="row_index">

                <v-col cols="4" v-for="(panel_row_item, panel_row_item_index) in panel_row" :key="panel_row_item_index">
                  <!-- Componente para cuentas y contactos-->
                  <v-card 
                  v-if="panel === 'CUENTAS' || panel === 'CONTACTOS'"
                  tile="true">
                    <v-card-text class="pb-2">
                      <p class="mb-0">{{ panel | capitalize_panel_name | singular_panel_name }}</p>
                      <!-- Informacion de contacto -->
                      <h3 class="text--primary mb-1">{{ panel_row_item.nombre }} {{ panel_row_item.apellidos }}</h3>
                      <p class="mb-0">
                        <v-icon small="true">mdi-phone</v-icon> &nbsp;&nbsp;
                        {{ panel_row_item.telefono }}
                      </p>
                      <p >
                        <v-icon small="true">mdi-email</v-icon>
                        {{ panel_row_item.correo }}
                      </p>
                      <!-- END Información de contacto-->


                      <p class="light-blue--text text--darken-2 d-inline mr-6">
                        <v-icon class="light-blue--text text--darken-2" small="true" >mdi-gender-male-female</v-icon>
                        Masculino
                      </p>
                      <p class="light-green--text text--darken-1 d-inline-block mb-0">
                        <v-icon class="light-green--text text--darken-1" small="true" >mdi-ring</v-icon>
                        Soltero
                      </p>
                      
                    </v-card-text>
                    <v-card-actions>
                      <v-btn target="_blank" href="/" text color="deep-purple accent-4">Ver en Salesforce</v-btn>
                    </v-card-actions>
                  </v-card>

                  <!-- Componente para prospectos-->
                  <v-card 
                  v-if="panel === 'PROSPECTOS'"
                  tile="true">
                    <v-card-text
                    class="pb-2">
                      <p class="mb-0">{{ panel | capitalize_panel_name | singular_panel_name }}</p>
                      <!-- Informacion de contacto -->
                      <h3 class="text--primary mb-1">{{ panel_row_item.nombre }} {{ panel_row_item.apellidos }}</h3>
                      <p class="mb-0">
                        <v-icon small="true">mdi-phone</v-icon> &nbsp;&nbsp;
                        {{ panel_row_item.telefono }}
                      </p>
                      <p >
                        <v-icon small="true">mdi-email</v-icon>
                        {{ panel_row_item.correo }}
                      </p>
                      <!-- END Información de contacto-->

                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr>
                              <td>Colegiatura</td>
                              <td class="text-right">{{ panel_row_item.colegiatura | to_currency_format }}</td>
                            </tr>
                            <tr>
                              <td>Colegiatura con descuento</td>
                              <td class="text-right">{{ panel_row_item.colegiatura_con_descuento | to_currency_format }}</td>
                            </tr>
                            <tr>
                              <td>Inscripción</td>
                              <td class="text-right">{{ panel_row_item.inscripcion | to_currency_format }}</td>
                            </tr>
                            <tr>
                              <td>Inscripción con descuento</td>
                              <td class="text-right">{{ panel_row_item.inscripcion_con_descuento | to_currency_format }}</td>
                            </tr>
                            <tr>
                              <td>Examen de Admisión</td>
                              <td class="text-right">{{ panel_row_item.examen_de_admision | to_currency_format }}</td>
                            </tr>
                            <tr>
                              <td>Forma de pago</td>
                              <td class="text-right">Efectivo</td>
                            </tr>
                            <tr>
                              <td><b>Total</b></td>
                              <td class="text-right"><b>{{ panel_row_item.total | to_currency_format }}</b></td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table> 
                    </v-card-text>
                    <v-card-actions>
                      <v-btn target="_blank" href="/" text="true" color="deep-purple accent-4">Ver en Salesforce</v-btn>
                    </v-card-actions>
                  </v-card>
            
                </v-col>
              </v-row>
            </v-expansion-panel-content>
            <v-expansion-panel-content 
            v-else
            color="grey lighten-4" 
            class="pt-3 pb-3" >
              <h3 class="text--primary">No hay {{ panel | lower_case_panel_name }} con este teléfono</h3>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>

    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data() {
    return {
      telefono: undefined,
      paneles: [
        "CUENTAS",
        "CONTACTOS",
        "PROSPECTOS"
      ],

      cuentas: [],
      contactos: [],
      prospectos: [],

    }

  },
  methods: {
    map_panel() {
      return{
        "CUENTAS": this.cuentas,
        "CONTACTOS": this.contactos,
        "PROSPECTOS": this.prospectos
      }
    },
    get_panel_length(panel) {
      return this.map_panel()[panel].length;
    },
    get_panel(panel) {
      return this.map_panel()[panel];
    },
    get_panel_rows(panel_name) {
      const COLS_PER_ROW = 3;
      let panel_rows = [];

      let panel = this.map_panel()[panel_name];
      let panel_length = panel.length;

      if(panel_length === 0)
        return [];

      let row = [];

      for(let panel_item_index = 0; panel_item_index !== panel_length; panel_item_index++){
        if(row.length === COLS_PER_ROW){
          panel_rows.push(row);
          row = [];
        }

        let panel_item = panel[panel_item_index];
        row.push(panel_item)
      }

      panel_rows.push(row);

      return panel_rows;
    }

  },
  filters:{
    capitalize_panel_name(panel_name){
      let first_char = panel_name[0];
      let remaining = panel_name.substring(1, panel_name.length).toLowerCase();
      return first_char + remaining;
    },
    lower_case_panel_name(panel_name){
      return panel_name.toLowerCase();
    },
    to_currency_format(amount){
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })

      return formatter.format(amount);
    },
    singular_panel_name(panel_name){
      return panel_name.substring(0, panel_name.length - 1)
    }
  },
  computed:{
    
  },
  beforeMount(){
    
    this.cuentas = [
    {
      "nombre": "Kelli",
      "apellidos": "Norman",
      "telefono": "(856) 437-2994",
      "correo": "Fisher@correo.com"
    },
    {
      "nombre": "Marcella",
      "apellidos": "Higgins",
      "telefono": "(907) 562-2763",
      "correo": "Ferguson@correo.com"
    },
    {
      "nombre": "Riggs",
      "apellidos": "Sparks",
      "telefono": "(904) 526-3140",
      "correo": "Salas@correo.com"
    }
  ]
  this.contactos= [
    {
      "nombre": "Green",
      "apellidos": "Preston",
      "telefono": "(918) 519-2537",
      "correo": "Vaughn@correo.com"
    },
    {
      "nombre": "Neva",
      "apellidos": "Doyle",
      "telefono": "(916) 471-2498",
      "correo": "Carlson@correo.com"
    },
    {
      "nombre": "Durham",
      "apellidos": "Bowen",
      "telefono": "(945) 463-2508",
      "correo": "Edna@correo.com"
    }
  ]
  this.prospectos = [
    {
      "nombre": "Young",
      "apellidos": "Heath",
      "telefono": "(927) 506-3435",
      "correo": "Whitney@correo.com",
      "inscripcion": 2035,
      "inscripcion_con_descuento": 49806,
      "colegiatura": 28137,
      "colegiatura_con_descuento": 23266,
      "examen_de_admision": 47525,
      "total": 32372,
      "forma_de_pago": ""
    },
    {
      "nombre": "Gallegos",
      "apellidos": "Morales",
      "telefono": "(982) 441-2562",
      "correo": "Pam@correo.com",
      "inscripcion": 18099,
      "inscripcion_con_descuento": 23435,
      "colegiatura": 12399,
      "colegiatura_con_descuento": 49742,
      "examen_de_admision": 5513,
      "total": 26242,
      "forma_de_pago": ""
    },
    {
      "nombre": "Church",
      "apellidos": "Mejia",
      "telefono": "(904) 493-2501",
      "correo": "Rush@correo.com",
      "inscripcion": 10043,
      "inscripcion_con_descuento": 19652,
      "colegiatura": 36737,
      "colegiatura_con_descuento": 3488,
      "examen_de_admision": 27618,
      "total": 22999,
      "forma_de_pago": ""
    }
  ]

  }
};
</script>
