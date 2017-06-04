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

const app = new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: h => h(Components.App)
});
