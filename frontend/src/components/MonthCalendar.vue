<template>
  <v-card>
    <v-card-title>{{ monthTitle }}</v-card-title>
    <v-card-text>
        <table>
            <thead>
                <tr>
                    <th v-for="day in weekNamesAbbr" :key="'='+day">{{day}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in days" :key="'_'+index">
                    <td v-for="day in row" :key="day">
                        <DayButton :day="getDate(day)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </v-card-text>
  </v-card>
</template>

<script>
import { monthNames, weekNamesAbbr } from '../api/consts'
import DayButton from './DayButton'
export default {
  components: { DayButton },
  props: ['month'],
  data: function () {
    return {}
  },
  methods: {
    getDate (day) {
      return new Date(this.month.getFullYear(), this.month.getMonth(), day)
    }
  },
  computed: {
    weekNamesAbbr () {
      return weekNamesAbbr
    },
    monthTitle () {
      return (
        monthNames[this.month.getMonth()] + ' de ' + this.month.getFullYear()
      )
    },
    days () {
      const days = []
      for (let i = 0; i < this.month.getDay(); i++) {
        days.push('')
      }
      const m = this.month.getMonth()
      const d = new Date(this.month.valueOf())
      while (d.getMonth() === m) {
        days.push(d.getDate())
        d.setDate(d.getDate() + 1)
      }
      const tdays = []
      while (days.length > 0) {
        tdays.push(days.splice(0, 7))
      }
      return tdays
    }
  }
}
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
td:first-child, td:nth-child(7) {
    font-weight: bold;
}
</style>
