import Vue from 'vue'

import '@/assets/scss/style.scss'

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
