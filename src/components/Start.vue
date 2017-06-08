<template lang="pug">
    v-layout(row wrap).vh-100-min.ma-0
        v-flex(xs12 sm6, :style="[background]").pa-0
            .layout.row.h-100.ma-0
                .m-a.white--text.text-xs-center
                    .display-1(v-if="!loading") {{user ? user.firstName || 'No Name' : 'Enter Existing Email to Sign In or Vice Versa'}}
                    v-progress-circular(indeterminate :size="100" v-else)
        v-flex(xs12 sm6).pa-0.accent
            .layout.row.h-100.ma-0(style="position: relative")
                v-btn(style="position: absolute" icon light v-if="signUp" @click.native="signUp = false")
                    v-icon(light) arrow_back
                .m-a
                    v-container(fluid)
                        .display-1.text-xs-center.primary--text DevWebTuts
                        v-text-field(v-if="!signUp" prepend-icon="email" light type="email" label="Email" v-model="credentials.email" hide-details)
                        v-fade-transition(mode="out-in")
                            div(v-if="signUp")
                                .title.text-xs-center.white--text {{credentials.email}}
                                v-text-field(light hide-details type="text" label="First Name" v-model="credentials.firstName")
                                v-text-field(light hide-details type="text" label="Middle Name" v-model="credentials.middleName")
                                v-text-field(light hide-details type="text" label="Last Name" v-model="credentials.lastName")
                        v-text-field(v-if="signUp || user" prepend-icon="vpn_key" light hide-details type="password" label="Password" v-model="credentials.password")
                        v-btn(primary block large light @click.native="action", :disabled="!validEmail || loading !== 0") {{user ? 'Sign In' : 'Sign Up'}}
        
</template>

<script>
import gql from '../gql';
export default {
    name: 'login',
    props: ['currentUser'],
    data() {
        return {
            credentials: {
                email: '',
                password: '',
                firstName: '',
                middleName: '',
                lastName: '',
            },
            user: null,
            loading: 0,
            signUp: false
        }
    },
    apollo: {
        user: {
            query: gql.queries.user,
            loadingKey: 'loading',
            variables() {
                return {
                    email: this.credentials.email
                }
            },
            fetchPolicy: 'network-only'
        }
    },
    computed: {
        validEmail() {
            return this.$store.getters.$emailRegEx.test(this.credentials.email);
        },
        background() {
            return {
                background: this.user ? `linear-gradient(rgba(39, 174, 96, 0.25), rgba(0, 0, 0, 0.5)),
                url(${this.user.image}) center center / cover no-repeat fixed` : '#27AE60'
            }
        }
    },
    methods: {
        async action() {
            if (this.user) {
                this.login();
            } else if (this.validEmail) {
                if (!this.signUp) {
                    this.signUp = true;
                } else {
                    this.register();
                }
            }
        },
        async register() {
            this.signUp = false;
        }
    },
    watch: {
        signUp(val) {
            if(val) return;
            Object.keys(this.credentials).forEach(key => this.credentials[key] = '');            
        }
    }
}
</script>
