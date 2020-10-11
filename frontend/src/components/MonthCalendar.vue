<template>
  <v-card>
    <v-card-title>{{ monthTitle }}</v-card-title>
    <v-card-text>
      <table>
        <thead>
          <tr>
            <th v-for="day in getWeekDaysAbbr" :key="'=' + day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in days" :key="'_' + index">
            <td v-for="(day, index) in row" :key="monthId + index">
              <DayButton :day="getDate(day)" v-on:update="updateDayEvents" />
            </td>
          </tr>
        </tbody>
      </table>
      <v-list dense v-if="events.length > 0 && showMonthEvents">
        <v-subheader>Eventos</v-subheader>

        <v-list-item v-for="(event, i) in events" :key="i">
          <v-chip class="ma-2">{{ event.day.getDate() }} </v-chip>
          <v-list-item-content v-for="(event, j) in event.events" :key="j">
            {{ event }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import DayButton from "./DayButton";
import { mapGetters } from "vuex";
export default {
  components: { DayButton },
  props: ["month", "holidays"],
  data: function () {
    return {
      events: [],
    };
  },
  mounted() {
    // this.events = this.holidays.;
    console.log("Events for " + this.month, {
      events: this.events,
      holidays: this.holidays,
    });
  },
  methods: {
    getDate(day) {
      return day == 0
        ? 0
        : new Date(this.month.getFullYear(), this.month.getMonth(), day);
    },
    updateDayEvents(day, events) {
      console.log("UpdateDayEvents", { day, events });
    },
  },
  computed: {
    ...mapGetters(["getMonthEvents", "showMonthEvents"]),
    ...mapGetters("consts", ["getMonthName", "getWeekDaysAbbr"]),
    monthId() {
      return ("00" + this.month.getMonth()).slice(-2);
    },
    monthTitle() {
      return this.getMonthName(this.month.getMonth());
    },
    days() {
      const days = [];
      for (let i = 0; i < this.month.getDay(); i++) {
        days.push(0);
      }
      const m = this.month.getMonth();
      const d = new Date(this.month.valueOf());
      while (d.getMonth() === m) {
        days.push(d.getDate());
        d.setDate(d.getDate() + 1);
      }
      const tdays = [];
      while (days.length > 0) {
        tdays.push(days.splice(0, 7));
      }
      return tdays;
    },
  },
};
</script>

<style>
td {
  text-align: center;
}
table {
  table-layout: fixed;
  width: 100%;
}
tr:nth-child(even) {
  background-color: aquamarine;
}
td:first-child,
td:nth-child(7) {
  font-weight: bold;
}
</style>
