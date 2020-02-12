<template>
  <v-app>
    
    <v-content>
      <v-container>
        <who-component :telefono="telefono" />
        <v-expansion-panels tile multiple :value="[0]" >
          <v-expansion-panel v-for="(panel, i) in paneles" :key="i">
            <v-expansion-panel-header color="#357673">
              <template v-slot:actions>
                <v-icon color="white"> $expand </v-icon> </template>
              <h3 class="white--text">{{ panel | capitalize_panel_name }} ({{ get_panel_length(panel) }})</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content 
            v-if="get_panel_length(panel) > 0"
            color="grey lighten-4" 
            class="pt-3 pb-3">
              <v-row v-for="(panel_row, row_index) in get_panel_rows(panel)" :key="row_index">

                <v-col cols="4" v-for="(panel_row_item, panel_row_item_index) in panel_row" :key="panel_row_item_index">
                  <template
                  v-if="panel === 'CUENTAS'">
                    <cuenta-card :cuenta="panel_row_item"/>
                  </template>
                  <template
                  v-else-if="panel === 'CONTACTOS'">
                    <contacto-card :contacto="panel_row_item" />
                  </template>
                  <template
                  v-else-if="panel === 'PROSPECTOS'">
                    <prospecto-card :prospecto="panel_row_item" />
                  </template>
                  
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
import WhoComponent from '@/components/Who';
import Cuenta from '@/components/Cuenta';
import Contacto from '@/components/Contacto';
import Prospecto from '@/components/Prospecto';


export default {
  name: 'App',
  components:{
    WhoComponent,
    'cuenta-card':Cuenta,
    'contacto-card':Contacto,
    'prospecto-card': Prospecto
  },
  data() {
    return {
      telefono: this.$route.query.telefono,
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
    }
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
    },{
      "nombre": "Riggs",
      "apellidos": "Sparks",
      "telefono": "(904) 526-3140",
      "correo": "Salas@correo.com"
    },{
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
