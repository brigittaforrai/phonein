/* eslint-disable */

Vue.config.productionTip = false;

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store.js';

// eslint-disable-next-line
var myApp = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
});
