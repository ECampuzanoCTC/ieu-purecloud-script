<template>
  <v-app>
    
    <v-content>
      <v-container>
        <who-component :telefono="telefono" />
        <v-expansion-panels tile multiple :value="[1]" >
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
      "owner": "Natasha Blackwell",
      "nombre": "Samantha",
      "apellidos": "Gregory",
      "telefono": "(839) 506-3097",
      "correo": "Michelle@correo.com",
      "fecha_apertura_grupo": "Thu Aug 04 1994 09:49:51 GMT+0000 (UTC)",
      "estatus": "activo",
      "nivel": "algún nivel",
      "programa": "Algún programa",
      "plantel": "algún plantel",
      "periodo": "algun periodo",
      "fecha_inicio_clases": "Mon Jun 11 1990 15:46:45 GMT+0000 (UTC)",
      "grupo": "algún grupo",
      "fecha_de_creacion": "Tue Jul 10 2007 17:11:23 GMT+0000 (UTC)",
      "etapa": "alguna etapa"
    },
    {
      "owner": "Mccarty Sweeney",
      "nombre": "Nellie",
      "apellidos": "Reilly",
      "telefono": "(908) 535-2632",
      "correo": "Mckay@correo.com",
      "fecha_apertura_grupo": "Sun Aug 07 1977 23:07:05 GMT+0000 (UTC)",
      "estatus": "activo",
      "nivel": "algún nivel",
      "programa": "Algún programa",
      "plantel": "algún plantel",
      "periodo": "algun periodo",
      "fecha_inicio_clases": "Tue Oct 28 2008 16:03:03 GMT+0000 (UTC)",
      "grupo": "algún grupo",
      "fecha_de_creacion": "Thu Dec 22 1988 23:07:51 GMT+0000 (UTC)",
      "etapa": "alguna etapa"
    },
    {
      "owner": "Cotton Chaney",
      "nombre": "Lola",
      "apellidos": "Padilla",
      "telefono": "(839) 555-2602",
      "correo": "Corinne@correo.com",
      "fecha_apertura_grupo": "Wed Jan 11 1989 12:00:27 GMT+0000 (UTC)",
      "estatus": "activo",
      "nivel": "algún nivel",
      "programa": "Algún programa",
      "plantel": "algún plantel",
      "periodo": "algun periodo",
      "fecha_inicio_clases": "Sat Mar 29 2008 22:19:53 GMT+0000 (UTC)",
      "grupo": "algún grupo",
      "fecha_de_creacion": "Sat May 17 2008 09:18:07 GMT+0000 (UTC)",
      "etapa": "alguna etapa"
    },
    {
      "owner": "Rivers Hodge",
      "nombre": "Fischer",
      "apellidos": "Cline",
      "telefono": "(857) 553-2995",
      "correo": "Golden@correo.com",
      "fecha_apertura_grupo": "Tue Jun 17 1980 08:09:31 GMT+0000 (UTC)",
      "estatus": "activo",
      "nivel": "algún nivel",
      "programa": "Algún programa",
      "plantel": "algún plantel",
      "periodo": "algun periodo",
      "fecha_inicio_clases": "Tue Aug 28 1984 14:44:35 GMT+0000 (UTC)",
      "grupo": "algún grupo",
      "fecha_de_creacion": "Sat Dec 23 1972 10:52:07 GMT+0000 (UTC)",
      "etapa": "alguna etapa"
    }
  ]
  }
};
</script>
