import { OptionsStorage } from '../../classes/OptionsStorage'

const state = () => ({
    showMonthEvents: true,
    showYearEvents: false,
    locale: null
})

const getters = {
    showMonthEvents: s => s.showMonthEvents,
    showYearEvents: s => s.showYearEvents,
    locale: s => s.locale,
    getOptions: s => {
        const options = new OptionsStorage()
        options.showMonthEvents = s.showMonthEvents
        options.showYearEvents = s.showYearEvents
        options.locale = s.locale
        return options
    }
}
const actions = {
    loadOptions({ commit, dispatch }) {
        const os = new OptionsStorage()
        commit('LOAD_OPTIONS', os)
        dispatch('consts/setLocale', os.locale, { root: true })
    },

}
const mutations = {
    LOAD_OPTIONS(s, value) {
        s.showMonthEvents = value.showMonthEvents
        s.showYearEvents = value.showYearEvents
        s.locale = value.locale
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}