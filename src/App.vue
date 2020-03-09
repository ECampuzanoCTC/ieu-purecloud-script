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
                  v-else-if="panel === 'PROSPECTOS'">
                    <prospecto-card :prospecto="panel_row_item" />
                  </template>
                  <template
                  v-else-if="panel === 'OPORTUNIDADES'">
                    <oportunidad-card :oportunidad="panel_row_item" />
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
          "OPORTUNIDADES": this.oportunidades,
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
        let cuentas = [];
        // eslint-disable-next-line no-undef
        Visualforce.remoting.Manager.invokeAction(
          'PurecloudScript_controller.getAccountsByPhone',
          this.telefono,
          function (result, event) {
            if (!event.status)
              alert("Ha courrido un error");
            result = JSON.parse(result);

            if (result.length === 0)
              return;

            for (var cuenta of result) {
              let {
                Name,
                ApeMaterno__c,
                Phone,
                PersonEmail,
                Sexo__c,
                EstadoCivil__c,
                Id
              } = cuenta;
              var cuenta_obj = {
                id: Id,
                nombre: Name,
                apellidos: ApeMaterno__c,
                telefono: Phone,
                correo: PersonEmail,
                sexo: Sexo__c,
                estado_civil: EstadoCivil__c
              }
              cuentas.push(cuenta_obj);
            }
            return cuentas;
          }, {
            escape: false
          });

        return cuentas;
      },
      
      get_prospectos() {
        let prospectos = [];
        // eslint-disable-next-line no-undef
        Visualforce.remoting.Manager.invokeAction(
          'PurecloudScript_controller.getLeadsByPhone',
          this.telefono,
          function (result, event) {
            if (!event.status)
              alert("Ha courrido un error");
            result = JSON.parse(result);

            if (result.length === 0)
              return;

            console.log(result);

            for (var prospecto of result) {
              let {
                Id,
                NombreCompleto__c,
                Phone,
                Email,
                Owner,
                Programa__r,
                Nivel__r,
                Periodo__r,
                Plantel__r,
                IndicadorInicioClases__c,
                FechaInicioClases__c,
                GrupoAsignado__r,
                FechaCreacion__c,
                Status

              } = prospecto;


              var prospecto_obj = {
                id: Id,
                nombre: NombreCompleto__c,
                telefono: Phone,
                correo: Email,
                fecha_creacion: FechaCreacion__c,
                etapa: Status,
                owner:{
                  id: Owner.Id,
                  nombre: Owner.Name
                },
                oferta_educativa:{
                  programa: Programa__r.Name,
                  periodo: Periodo__r.Name,
                  plantel: Plantel__r.Name,
                  nivel: Nivel__r.Name,
                  fecha_inicio_clases: FechaInicioClases__c,
                  estatus: IndicadorInicioClases__c
                },
                grupo:{
                  nombre: GrupoAsignado__r.Name,
                  fecha_apertura: GrupoAsignado__r.FechaEstimadaApertura__c
                }
              }
              console.log(prospecto_obj);
              prospectos.push(prospecto_obj);              
            }

            return prospectos;
          }, {
            escape: false
          });

        return prospectos;
      },
      get_oportunidades(){
        let oportunidades = [];

        // eslint-disable-next-line no-undef
        Visualforce.remoting.Manager.invokeAction(
          'PurecloudScript_controller.getOpportunitiesByPhone',
          this.telefono,
          function (result, event) {
            if (!event.status)
              alert("Ha courrido un error");
            result = JSON.parse(result);

            if (result.length === 0)
              return;

            console.log(result);

            for (var oportunidad of result) {
              let {
                Id,
                Name,
                Account,
                CorreoCuenta__c,
                Owner,
                Programa__r,
                Nivel__r,
                Periodo__r,
                Plantel__r,
                IndicadorInicioClases__c,
                FechainicioClases__c,
                Grupo__r,
                FechaAperturaGrupo__c,
                StageName
              } = oportunidad;


              var oportunidad_obj = {
                id: Id,
                nombre: Name,
                telefono: Account.Phone,
                correo: CorreoCuenta__c,
                fecha_creacion: undefined,
                etapa: StageName,
                owner:{
                  id: Owner.Id,
                  nombre: Owner.Name
                },
                oferta_educativa:{
                  programa: Programa__r.Name,
                  periodo: Periodo__r.Name,
                  plantel: Plantel__r.Name,
                  nivel: Nivel__r.Name,
                  fecha_inicio_clases: FechainicioClases__c,
                  estatus: IndicadorInicioClases__c
                },
                grupo:{
                  nombre: Grupo__r.Name,
                  fecha_apertura: FechaAperturaGrupo__c
                }
              }
              console.log(oportunidad_obj);
              oportunidades.push(oportunidad_obj);              
            }

            return oportunidades;
          }, {
            escape: false
          });

        return oportunidades;
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
    this.oportunidades = this.get_oportunidades();
    this.prospectos = this.get_prospectos();
  }
};
</script>
