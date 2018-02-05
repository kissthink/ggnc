// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueJWT from 'vuejs-jwt'
import ElementUI from 'element-ui'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'

// components
import BackHistory from './components/shared/backHistory'

Vue.config.productionTip = false
Vue.use(BootstrapVue, axios)
Vue.use(VueJWT)
Vue.use(ElementUI)

// use components for global
Vue.component('back-history', BackHistory)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
