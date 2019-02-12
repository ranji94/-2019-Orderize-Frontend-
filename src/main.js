import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap';


Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
