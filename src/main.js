// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import SuiVue from 'semantic-ui-vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(SuiVue);

new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
})
