<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px" v-if="dayNumber">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-if="dayNumber" v-bind="attrs" v-on="on">{{
          dayNumber
        }}</v-btn>
      </template>
      <v-card>
        <v-toolbar dense>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>{{ dayTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addEvent" title="Adicionar evento">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" v-if="events.length == 0">
                <v-btn text @click="addEvent" elevation="2" color="primary"
                  >Adicione um evento a este dia</v-btn
                >
              </v-col>
              <v-col cols="12" v-for="event in events" :key="event.id">
                <v-text-field
                  label="Evento"
                  required
                  v-model="event.event"
                  append-icon="mdi-minus"
                  @click:append="deleteEvent(event)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Gravar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { log } from "../api/log";
import { locale } from "../api/consts";
export default {
  props: ["day", "data"],
  data: function () {
    return {
      dayNumber: 0,
      dialog: false,
      events: [
        { id: 1, event: "Teste" },
        { id: 2, event: "Teste 2" },
      ],
    };
  },
  computed: {
    dayTitle() {
      return this.day.toLocaleDateString(locale, { dateStyle: "full" });
    },
  },
  methods: {
    save() {
      this.dialog = false;
      if (!this.dayNumber) {
        return;
      }
      this.$emit("update", this.day, this.events);
    },
    clickDay() {
      if (!this.dayNumber) {
        return;
      }

      alert(this.data);
    },
    addEvent() {
      let event = prompt("Informe o novo evento");
      if (!event) {
        return;
      }
      this.events.push({ id: this.events.length + 1, event: event });
    },
    deleteEvent(event) {
      console.log("deleteEvent", event);
      if (confirm(`Deseja excluir o evento "${event.event}"?`)) {
        this.events = this.events.filter((x) => x.id != event.id);
      }
    },
  },
  mounted() {
    if (typeof this.day.getMonth !== "function") {
      return;
    }
    this.dayNumber = this.day.getDate();
    if (!this.data) {
      return;
    }
    let events = (Array.isArray(this.data) ? this.data : [this.data]).map(
      (x, index) => {
        return { id: index, event: x };
      }
    );
    console.log("DayButton events", events);
  },
};
</script>

<style scoped>
div {
  text-align: center;
}
</style>
