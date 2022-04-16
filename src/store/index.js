// //vue2x的写法
// import Vue from 'vue'
// import Vuex from 'vuex'

// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'

// Vue.use(Vuex)

// const state = {
//     cartList: []
// }

// const store = new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// })

import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'
import modules from './modules.js'
const state = {
    cartList: []
};
//vue3x的写法
import { createStore } from 'vuex'

export default createStore({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: modules
})