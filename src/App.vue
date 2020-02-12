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
        return {
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
          }, {
            escape: false
          });

        return cuentas;
      },
      get_contactos() {
        let contactos = [];
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

            for (var contacto of result) {
              let {
                Id,
                Name,
                Phone,
                Email
              } = contacto;
              var contacto_obj = {
                id: Id,
                nombre: Name,
                telefono: Phone,
                correo: Email
              }
              contactos.push(contacto_obj);
            }
          }, {
            escape: false
          });

        return contactos;
      },
      get_prospectos() {
        let prospectos = [];
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

            // Id, NombreCompleto__c, Phone, Email, Inscripcion__c, InscripcionDescuento__c, Colegiatura__c, ColegiaturaDescuento__c, ImporteTotal__c, ExamenAdmision__c

            for (var prospecto of result) {
              let {
                Id,
                NombreCompleto__c,
                Phone,
                Email,
                Inscripcion__c,
                InscripcionDescuento__c,
                Colegiatura__c,
                ColegiaturaDescuento__c,
                ImporteTotal__c,
                ExamenAdmision__c,
                FormaPago__c
              } = prospecto;


              var prospecto_obj = {
                id: Id,
                nombre: NombreCompleto__c,
                telefono: Phone,
                correo: Email,
                inscripcion: Inscripcion__c,
                inscripcion_con_descuento: InscripcionDescuento__c,
                colegiatura: Colegiatura__c,
                colegiatura_con_descuento: ColegiaturaDescuento__c,
                importe: ImporteTotal__c,
                examen_de_admision: ExamenAdmision__c,
                forma_de_pago: FormaPago__c
              }
              prospectos.push(prospecto_obj);
            }
          }, {
            escape: false
          });

        return prospectos;
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
    this.contactos = this.get_contactos();
    this.prospectos = this.get_prospectos();
  }
};
</script>
