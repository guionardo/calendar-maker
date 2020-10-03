<template>
  <v-app>
    <v-app-bar
    app
    color='primary'
    dark>
      <div class='d-flex align-center'>
        <v-icon large dark>mdi-calendar</v-icon>&nbsp;
        <h1>Calendar Maker</h1>
      </div>

      <v-spacer></v-spacer>

      <v-select style="max-width: 80px" title="Ano" v-model="year" :items="years" />
    </v-app-bar>

    <v-main>
      <v-container>
      <v-row justify="space-around">
        <v-col v-for="month in months" :key="month+'_'" cols="4">
          <MonthCalendar :month="month"/>
        </v-col>
      </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import MonthCalendar from './components/MonthCalendar'
export default {
  name: 'App',

  components: {
    // HelloWorld,
    MonthCalendar
  },

  data: () => ({
    year: 0,
    years: []
  }),
  computed: {
    months () {
      const months = []
      for (let m = 0; m < 12; m++) {
        months.push(new Date(this.year, m, 1))
      }
      return months
    }
  },
  created () {
    const year = new Date().getFullYear()
    this.year = year
    this.years = [year - 2, year - 1, year, year + 1]
  }
}
</script>
