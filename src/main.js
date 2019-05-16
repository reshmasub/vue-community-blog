import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
import VueDisqus from 'vue-disqus'

Vue.use(VueDisqus)
Vue.use(VueNoty)
Vue.config.productionTip = false

const authData = localStorage.getItem("auth");

new Vue({
  router,
  data : {
    auth : authData ? JSON.parse(authData) : {}
  },
  render: h => h(App),
}).$mount('#app')
