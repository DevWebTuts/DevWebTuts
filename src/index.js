import Vue from 'vue';

import Vuetify from 'vuetify';
import VueApollo from 'vue-apollo';

import store from './store';
import router from './router';

import Components from './components';
import client from './apollo';
import hljs from 'highlight.js';

window.hljs = hljs;
import './utils';

Vue.use(Vuetify);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: client,
})
router.beforeEach((to, from, next) => {
  store.dispatch('currentUser');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.graphCoolToken || !store.getters.$currentUser) {
      console.log("NOT LOGGED IN");
      next({
        path: '/',
      })
    } else {
      console.log("LOGGED IN");
      next()
    }
  } else {

    next() // make sure to always call next()!
  }
})
const app = new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  render: h => h(Components.App)
});