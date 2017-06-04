<template lang="pug">
    v-layout(row wrap).vh-100-min.ma-0
        v-flex(xs12 sm6, :style="[background]").pa-0
            .layout.row.h-100.ma-0
                .m-a.white--text.text-xs-center
                    .display-2(v-if="!loading") {{user ? user.firstName || 'No Name' : 'Get Started'}}
                    v-progress-circular(indeterminate :size="100" v-else)
        v-flex(xs12 sm6).pa-0.accent
            .layout.row.h-100.ma-0
                .m-a
                    v-container(fluid)
                        .display-1.text-xs-center.primary--text DevWebTuts
                        v-text-field(prepend-icon="email" light type="email" label="Email" v-model="credentials.email" hide-details)
                        v-fade-transition(mode="out-in")
                            template(v-if="user")
                                v-text-field(prepend-icon="vpn_key" light hide-details type="password" label="Password" v-model="credentials.password")
                        v-btn(primary block large light @click.native="action") {{user ? 'Sign In' : credentials.email ? 'Sign Up' : 'Next'}}
</template>

<script>
import gql from '../gql';
export default {
    name: 'login',
    data() {
        return {
            credentials: {
                email: '',
                password: ''
            },
            user: null,
            loading: 0,
        }
    },
    apollo: {
        user: {
            query: gql.queries.user,
            loadingKey: 'loading',
            pollInterval: 1000,
            variables() {
                return {
                    email: this.credentials.email
                }
            }
        }
    },
    computed: {
        background() {
            return {
                background: this.user ? `linear-gradient(rgba(39, 174, 96, 0.25), rgba(0, 0, 0, 0.5)),
                url(${this.user.image}) center center / cover no-repeat fixed` : '#27AE60'
            }
        }
    },
    methods: {
        async action() {
            if(this.user) {
                this.login();
            }
        },
        async login() {
            let user = this.$apollo.mutate({
                mutation: gql.mutations.signInUser,
                variables: {
                    email: this.credentials.email,
                    password: this.credentials.password
                }
            })
            console.log(user);
        },
        register() {
            this.$apollo.mutate({
                mutation: gql.mutations.createUser,
                variables: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
        }
    }
}
</script>
