<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon large dark>mdi-calendar</v-icon>&nbsp;
        <h1>Calendar Maker</h1>
      </div>

      <v-spacer />

      <v-select
        style="max-width: 80px"
        title="Ano"
        v-model="year"
        :items="years"
        @change="changedYear"
      />

      <v-spacer />
      <OptionsMenu />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row justify="space-around">
          <v-col
            v-for="month in months"
            :key="month.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
            xl="4"
          >
            <MonthCalendar :month="month.month" :holidays="month.holidays" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="font-wheight-medium">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} - <strong>Calendar Maker</strong> -
        <small>Build: {{ buildDate }}</small>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import MonthCalendar from "./components/MonthCalendar";
import OptionsMenu from "./components/OptionsMenu";
import { buildDateLocale } from "./api/consts";
import { holidays } from "./api/holidays";

export default {
  name: "App",

  components: {
    MonthCalendar,
    OptionsMenu,
  },

  data: () => ({
    year: 0,
    years: [],
    holidays: [],
  }),
  methods: {
    changedYear() {
      this.holidays = holidays(this.year);
    },
  },
  computed: {
    months() {
      const months = [];
      for (let m = 0; m < 12; m++) {
        months.push({
          id: m,
          month: new Date(this.year, m, 1),
          holidays: this.holidays.filter((x) => x.day.getMonth() == m),
        });
      }
      return months;
    },
    buildDate() {
      return buildDateLocale;
    },
  },
  created() {
    const year = new Date().getFullYear();
    this.year = year;
    this.years = [year - 2, year - 1, year, year + 1];
  },
};
</script>
