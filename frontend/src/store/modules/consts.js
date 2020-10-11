import { environment, buildDate } from '../../../build_info'

const Capitalize = (text, resize = 0) => text.charAt(0).toUpperCase() + text.slice(1, resize <= 0 ? 1024 : resize)

const state = () => ({
    buildDate: buildDate,
    environment: environment,
    monthNames: [],
    monthNamesAbbr: [],
    weekNames: [],
    weekNamesAbbr: []
})

const getters = {
    buildDate: (s) => s.buildDate,
    environment: (s) => s.environment,
    getMonthName: (s) => (monthId) => s.monthNames[monthId],
    getWeekDayAbbr: (s) => (weekDayId) => s.weekNamesAbbr[weekDayId],
    getWeekDaysAbbr: (s) => s.weekNamesAbbr
}
const actions = {
    setLocale({ commit }, locale) {
        const objDate = new Date()
        objDate.setDate(1)
        const monthNames = []
        for (let m = 0; m < 12; m++) {
            objDate.setMonth(m)
            monthNames.push(Capitalize(objDate.toLocaleString(locale, { month: 'long' })))
        }
        commit('SET_MONTH_NAMES', monthNames)

        objDate.setDate(1)
        objDate.setMonth(3)
        objDate.setFullYear(2020)
        const weekNames = []
        for (let d = 5; d <= 11; d++) {
            objDate.setDate(d)
            weekNames.push(Capitalize(objDate.toLocaleString(locale, { weekday: 'long' })))
        }

        commit('SET_WEEK_NAMES', weekNames)




    }

}
const mutations = {
    SET_MONTH_NAMES(s, value) {
        s.monthNames = value
        s.monthNamesAbbr = value.map(x => x.charAt(0).toUpperCase() + x.slice(1, 3))
    },
    SET_WEEK_NAMES(s, value) {
        s.weekNames = value
        s.weekNamesAbbr = value.map(x => x.charAt(0).toUpperCase() + x.slice(1, 3))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}