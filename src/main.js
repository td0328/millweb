import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios';
import store from './store/index';
import router from './router/login';
import config from './resource/config';
Vue.use(ElementUI);

Vue.prototype.axios = axios;
Vue.prototype.sessionStore = store;

axios.defaults.baseURL = config.baseURL;
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
