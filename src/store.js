import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import gql from './gql';
import client from './apollo';
import auth from './auth';
Vue.use(Vuex);

const state = {
    snackbar: null,
    currentUser: null,
    emailRegEx: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
};
const mutations = {
    SNACKBAR: (state, val) => state.snackbar = val,
    CURRENT_USER: (state, val) => state.currentUser = val
};
const getters = {
    $snackbar: state => state.snackbar,
    $emailRegEx: state => state.emailRegEx,
    $currentUser: state => state.currentUser
};
const actions = {
    snackbar({
        commit
    }, val) {
        commit("SNACKBAR", val);
    },
    login() {
        auth.show({
            allowSignUp: false
        });
    },
    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("idToken");
        localStorage.removeItem("userToken");
        router.push({name: 'home'})
    },
    async register({
        dispatch
    }, variables) {
        try {
            let data = await client.mutate({
                mutation: gql.mutations.createUser,
                variables
            })
        } catch (error) {
            console.log(error);
        }
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});

auth.on("authenticated", async authResult => {
    if (!authResult) return;
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("idToken", authResult.idToken);
    try {

        let res = await client.mutate({
            mutation: gql.mutations.signInUser,
            variables: {
                idToken: authResult.idToken
            }
        });
        localStorage.setItem("userToken", res.data.user.token)

    } catch (e) {
        auth.getUserInfo(authResult.accessToken, async(error, profile) => {
            if (error) return;
            console.log(profile);
            let variables = {
                idToken: authResult.idToken,
                email: profile.email,
                firstName: profile.given_name,
                lastName: profile.family_name,
                middleName: profile.middle_name,
                image: profile.picture_large
            };

            let user = await client.mutate({
                mutation: gql.mutations.createUser,
                variables
            });
            console.log(user);
        })
    }

});

export default store;