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
                  v-if="panel === 'PROSPECTOS'">
                    <prospecto-card :prospecto="panel_row_item" />
                  </template>
                  <template
                  v-if="panel === 'OPORTUNIDADES'">
                    <oportunidad-card :oportunidad="panel_row_item"/>
                  </template>
                  <template
                  v-if="panel === 'CUENTAS'">
                    <cuenta-card :cuenta="panel_row_item"/> 
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
import Prospecto from '@/components/Prospecto';
import Oportunidad from '@/components/Oportunidad';


export default {
  name: 'App',
  components:{
    WhoComponent,
    'cuenta-card':Cuenta,
    'prospecto-card': Prospecto,
    'oportunidad-card': Oportunidad
  },
  data() {
    return {
      telefono: this.$route.query.telefono,
      paneles: [
        "PROSPECTOS",
        "OPORTUNIDADES",
        "CUENTAS"
      ],

      cuentas: [],
      prospectos: [],
      oportunidades: []

    }

  },
  methods: {
    map_panel() {
        return {
          "CUENTAS": this.cuentas,
          "CONTACTOS": this.contactos,
          "PROSPECTOS": this.prospectos,
          "OPORTUNIDADES": this.oportunidades
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

        if (panel_length === 0)
          return [];

        let row = [];

        for (let panel_item_index = 0; panel_item_index !== panel_length; panel_item_index++) {
          if (row.length === COLS_PER_ROW) {
            panel_rows.push(row);
            row = [];
          }

          let panel_item = panel[panel_item_index];
          row.push(panel_item)
        }

        panel_rows.push(row);

        return panel_rows;
      },
      get_cuentas() {
        return []
      },
      
      get_prospectos() {
        return [
    {
      "owner": "Copeland Schmidt",
      "nombre": "Chapman",
      "apellidos": "Singleton Sims",
      "telefono": "(912) 512-2711",
      "correo": "krystal@correo.com",
      "fecha_creacion": "Mon Jan 07 2019 17:47:41 GMT+0000 (UTC)",
      "etapa": "alguna etapa",
      "oferta_educativa": {
        "programa": "algún programa",
        "nivel": "algún nivel",
        "plantel": "algún plantel",
        "periodo": "algún periodo",
        "fecha_inicio_clases": "Fri Aug 04 1995 00:48:56 GMT+0000 (UTC)",
        "estatus": "algún estatus"
      },
      "grupo": {
        "nombre": "algún grupo",
        "fecha_apertura": "Sun Jul 20 1980 04:33:06 GMT+0000 (UTC)"
      }
    },
    {
      "owner": "Spencer Nguyen",
      "nombre": "Townsend",
      "apellidos": "Dunn Austin",
      "telefono": "(806) 580-2498",
      "correo": "olsen@correo.com",
      "fecha_creacion": "Wed Sep 22 1993 13:44:04 GMT+0000 (UTC)",
      "etapa": "alguna etapa",
      "oferta_educativa": {
        "programa": "algún programa",
        "nivel": "algún nivel",
        "plantel": "algún plantel",
        "periodo": "algún periodo",
        "fecha_inicio_clases": "Wed Aug 06 2003 03:12:44 GMT+0000 (UTC)",
        "estatus": "algún estatus"
      },
      "grupo": {
        "nombre": "algún grupo",
        "fecha_apertura": "Wed Apr 06 1977 15:43:36 GMT+0000 (UTC)"
      }
    },
    {
      "owner": "Ila Vasquez",
      "nombre": "Tanner",
      "apellidos": "Cameron Mann",
      "telefono": "(893) 578-2781",
      "correo": "susanne@correo.com",
      "fecha_creacion": "Fri Sep 13 1991 14:09:33 GMT+0000 (UTC)",
      "etapa": "alguna etapa",
      "oferta_educativa": {
        "programa": "algún programa",
        "nivel": "algún nivel",
        "plantel": "algún plantel",
        "periodo": "algún periodo",
        "fecha_inicio_clases": "Tue Feb 27 1996 07:49:56 GMT+0000 (UTC)",
        "estatus": "algún estatus"
      },
      "grupo": {
        "nombre": "algún grupo",
        "fecha_apertura": "Wed Feb 20 1991 16:00:51 GMT+0000 (UTC)"
      }
    },
    {
      "owner": "Mccall Cole",
      "nombre": "Goodwin",
      "apellidos": "Stokes Lindsay",
      "telefono": "(837) 505-2947",
      "correo": "annmarie@correo.com",
      "fecha_creacion": "Fri Jan 08 1971 10:17:02 GMT+0000 (UTC)",
      "etapa": "alguna etapa",
      "oferta_educativa": {
        "programa": "algún programa",
        "nivel": "algún nivel",
        "plantel": "algún plantel",
        "periodo": "algún periodo",
        "fecha_inicio_clases": "Mon Jan 07 1974 23:43:21 GMT+0000 (UTC)",
        "estatus": "algún estatus"
      },
      "grupo": {
        "nombre": "algún grupo",
        "fecha_apertura": "Tue May 24 1983 12:29:57 GMT+0000 (UTC)"
      }
    }
  ]
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
  computed:{
    
  },
  beforeMount(){
    this.cuentas = this.get_cuentas();
    this.prospectos = this.get_prospectos();
    this.oportunidades =this.get_prospectos();
  }
};
</script>
