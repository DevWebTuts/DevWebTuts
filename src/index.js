import Vue from 'vue';

import Vuetify from 'vuetify';
import VueApollo from 'vue-apollo';

import store from './store';
import router from './router';

import Components from './components';
import client from './apollo';

import VueMoment from 'vue-moment';
import VueWorker from 'vue-worker'

import './utils';


Vue.use(VueMoment);
Vue.use(Vuetify);
Vue.use(VueApollo);
Vue.use(VueWorker);
const apolloProvider = new VueApollo({
  defaultClient: client,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!localStorage.userToken || !store.getters.$currentUser) {
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