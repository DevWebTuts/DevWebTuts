// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
//require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================
require('highlight.js/styles/atom-one-dark.css')
require('codemirror/lib/codemirror.css')
require('./statics/atom-one-dark.css')
require('codemirror/addon/hint/show-hint.css')
// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, * as All from 'quasar'
import router from './router'
import gql from './gql'
import auth from './auth'
import VueApollo from 'vue-apollo'

import client from './apollo'

import VueMoment from 'vue-moment'
import VueMeta from 'vue-meta'

Vue.use(VueMoment)
Vue.use(VueApollo)
Vue.use(VueMeta)

const apolloProvider = new VueApollo({
    defaultClient: client,
});
console.log(gql)
Vue.prototype.$gql = gql

Vue.config.productionTip = false
Vue.use(Quasar, {
    components: All,
    directives: All
}) // Install Quasar Framework

if (__THEME === 'mat') {
    require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
        el: '#q-app',
        router,
        apolloProvider,
        render: h => h(require('./App')),
        methods: {
            login() {
                auth.show({
                    allowSignUp: false
                });
            },
            logout() {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("idToken");
                localStorage.removeItem("userToken");
                this.$router.push({ name: 'home' })
            },
        },
        created() {
            auth.on("authenticated", async authResult => {
                if (!authResult) return;
                localStorage.setItem("accessToken", authResult.accessToken);
                localStorage.setItem("idToken", authResult.idToken);
                try {

                    let { data } = await client.mutate({
                        mutation: this.$gql.mutations.signInUser,
                        variables: {
                            idToken: authResult.idToken
                        }
                    });
                    localStorage.setItem("userToken", data.user.token)

                } catch (e) {
                    auth.getUserInfo(authResult.accessToken, async(error, profile) => {
                        if (error) return;
                        let variables = {
                            idToken: authResult.idToken,
                            email: profile.email,
                            firstName: profile.given_name,
                            lastName: profile.family_name,
                            middleName: profile.middle_name,
                            image: profile.picture_large
                        };

                        let user = await client.mutate({
                            mutation: this.$gql.mutations.createUser,
                            variables
                        });
                    })
                }

            })
        },
    })
})