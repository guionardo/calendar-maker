import Vue from 'vue'
import Vuex from 'vuex'

import holidays from './modules/holidays'
import options from './modules/options'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        holidays,
        options
    },
    strict: debug
})