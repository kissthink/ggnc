// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueJWT from 'vuejs-jwt'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'

// components
import BackHistory from './components/shared/backHistory'
import AmountSelect from './components/shared/amountSelect'

// filter.js
import filter from './assets/js/filter.js'

Vue.config.productionTip = false
Vue.use(BootstrapVue, axios)
Vue.use(ElementUI)
Vue.use(VueJWT)

// use components for global
Vue.component('back-history', BackHistory)
Vue.component('amount-select', AmountSelect)

// defined filter for global
Vue.filter('transformTime', filter.transformTime)
Vue.filter('businessType', filter.transformBusinessType)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
