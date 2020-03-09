import Vue from 'vue'
import VueRouter from 'vue-router';
import App from '@/App'
import vuetify from './plugins/vuetify';

const routes = [
    {
        path: '/', component: App
    }
]

const router  = new VueRouter({
    mode: "history",
    routes
})

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(VueRouter);
new Vue({
  vuetify,
  router,
  render: h=>h(App)
}).$mount('#app')
