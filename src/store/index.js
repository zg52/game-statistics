import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import dashboard from './modules/dashboard'
import settings from './modules/settings'
import user from './modules/user'
import application from './modules/application'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dashboard,
    app,
    settings,
    user,
    application
  },
  getters
})

export default store
