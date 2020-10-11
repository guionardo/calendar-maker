import Vue from 'vue'
import Vuex from 'vuex'
import { storage } from '../api/storage'
import holidays from './modules/holidays'
import options from './modules/options'
import consts from './modules/consts'

Vue.use(Vuex)

function sameDay(d1, d2) {
  return (typeof d1.getMonth == 'function' && typeof d2.getMonth === 'function') &&
    (d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate())
}

function sameMonth(d1, d2) {
  d1 = (typeof d1.getMonth == 'function') ? d1.getMonth() : d1
  d2 = (typeof d2.getMonth == 'function') ? d2.getMonth() : d2
  return d1 == d2
}

export default new Vuex.Store({
  state: {
    options: {
      monthEvents: false,
      yearEvents: false
    },
    events: [
      { day: new Date(new Date().getFullYear(), 6, 2), events: ['Aniversário de Blumenau', 'Outro evento'] },
      { day: new Date(new Date().getFullYear(), 6, 7), events: ['Independência do Brasil'] },
      { day: new Date(new Date().getFullYear(), 9, 12), events: ['Dia das crianças'] },
      { day: new Date(new Date().getFullYear(), 11, 25), events: ["Natal"] }
    ]
  },
  getters: {
    showMonthEvents: (s) => s.options.monthEvents,
    showYearEvents: (s) => s.options.yearEvents,
    getMonthEvents: (s) => (month) => s.events.filter(e => sameMonth(e.day, month)),
    getDayEvents: (s) => (day) => s.events.filter(e => sameDay(e.day, day))
  },
  mutations: {
    SET_MONTH_EVENTS(s, value) { s.options.monthEvents = !!value },
    SET_YEAR_EVENTS(s, value) { s.options.yearEvents = !!value }
  },
  actions: {
    loadEvents({ commit }) {
      // Read events from localstorage
      let values = storage.getOptions()

      commit('SET_MONTH_EVENTS', values.monthEvents)
      commit('SET_YEAR_EVENTS', values.yearEvents)
    },
    setShowMonthEvents({ commit }, value) {
      storage.setOption('monthEvents', !!value)
      commit('SET_MONTH_EVENTS', value)
    },
    setShowYearEvents({ commit }, value) {
      storage.setOption('yearEvents', !!value)
      commit('SET_YEAR_EVENTS', value)
    }
  },
  modules: {
    holidays,
    options,
    consts
  }
})
