import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import gql from './gql';
import client from './apollo';
Vue.use(Vuex);

const state = {
    snackbar: null,
    emailRegEx: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
    currentUser: null
};
const mutations = {
    SNACKBAR: (state, val) => state.snackbar = val,
    CURRENT_USER: (state, val) => state.currentUser = val,
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

    async currentUser({
        commit
    }) {
        let {
            data
        } = await client.query({
            query: gql.queries.currentUser
        })
        if (!data) return;
        commit('CURRENT_USER', data.currentUser);
    },
    async login({},{email,password}) {
        let {
            data
        } = await client.mutate({
            mutation: gql.mutations.signInUser,
            variables: {
                email,
                password
            }
        })
        if (!data) return;
        localStorage.graphCoolToken = data.user.token;
    },
    async register({
        dispatch
    }, {
        email,
        password,
        firstName,
        lastName,
        middleName
    }) {
        await client.mutate({
            mutation: gql.mutations.createUser,
            variables: {
                email,
                password,
                firstName,
                lastName,
                middleName
            }
        })
        await dispatch('login', {
            email,
            password
        });
        this.signUp = false;
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})


export default store;