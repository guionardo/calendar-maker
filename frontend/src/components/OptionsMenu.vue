<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon title="Opções"
        ><v-icon>mdi-cog-outline</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://github.com/guionardo.png" alt="Guionardo" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Guionardo Furlan</v-list-item-title>
            <v-list-item-subtitle>Developer</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon href="https://github.com/guionardo" target="_empty">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="showMonthEvents"></v-switch>
          </v-list-item-action>
          <v-list-item-title>Mostrar eventos de cada mês</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="showYearEvents"></v-switch>
          </v-list-item-action>
          <v-list-item-title>Mostrar eventos do ano</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-translate</v-icon></v-list-item-icon
          ><LocaleSelect
        /></v-list-item>
      </v-list>

      <v-divider />
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-btn icon @click="saveCalendar">
              <v-icon>mdi-application-export</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-title>Gravar calendário</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-btn icon @click="loadCalendar">
              <v-icon>mdi-application-import</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-title>Carregar calendário</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="cancel"> Cancelar </v-btn>
        <v-btn color="primary" text @click="save"> Gravar </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LocaleSelect from "./LocaleSelect";
export default {
  components: { LocaleSelect },
  data: () => ({
    fav: true,
    menu: false,
    monthEvents: false,
    yearEvents: false,
    mountedOptions: {},
  }),
  mounted() {
    this.mountedOptions = {
      monthEvents: this.showMonthEvents,
      yearEvents: this.showYearEvents,
    };
    this.monthEvents = this.showMonthEvents;
    this.yearEvents = this.showYearEvents;
  },
  computed: {
    ...mapGetters(["showMonthEvents", "showYearEvents"]),
  },
  methods: {
    ...mapActions(["setShowMonthEvents", "setShowYearEvents"]),
    cancel() {
      this.menu = false;
    },
    save() {
      this.menu = false;
      if (
        this.mountedOptions.monthEvents !== this.monthEvents ||
        this.mountedOptions.yearEvents !== this.yearEvents
      ) {
        this.setShowMonthEvents(this.monthEvents);
        this.setShowYearEvents(this.yearEvents);
      }
    },
    saveCalendar() {},
    async loadCalendar() {
      const { value: file } = await this.$swal.fire({
        title: "Carregar calendário",
        input: "file",
        inputAttributes: {
          accept: "application/JSON",
          "aria-label": "Informe o arquivo do calendário",
        },
      });
      const that = this;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            let data = JSON.parse(e.target.result);
            console.log("LoadCalendar", data);
            that.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              type: "success",
              title: "Hi man",
              text: "is a good day!",
            });
          } catch (err) {
            console.error("LoadCalendar", err);
          }
        };
        reader.readAsText(file);
        //reader.readAsDataURL(file);
      }
      this.menu = false;
    },
  },
};
</script>

<style>
</style>