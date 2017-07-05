// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Meta from 'vue-meta'
import router from './router'
import store from './store'
import { getStore } from './utils/storage'

import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(Meta)

sync(store, router)
let isLogin = Boolean(getStore('isLogin'))
if(isLogin){
    store.commit("global/isLogin", 'true')
    store.dispatch("global/getUserInfo")
}

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')
