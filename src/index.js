import Vue from 'vue';

import Vuetify from 'vuetify';
import VueApollo from 'vue-apollo';

import store from './store';
import router from './router';

import Components from './components';
import client from './apollo';
import hljs from 'highlight.js';

import VueMoment from 'vue-moment';
import marked from 'marked';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

marked.setOptions({
  highlight(code) {
    return hljs.highlightAuto(code).value;
  }
});

window.hljs = hljs;
import './utils';
Vue.use(VueMoment);
Vue.use(Vuetify);
Vue.use(VueApollo);

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