<template lang="pug">
    v-app
        .fixed.flexbox.pb-3(style="flex-direction: column-reverse; right: 2%; z-index: 999; height: 100%")
            transition(enterActiveClass="animated rollIn" leaveActiveClass="animated rollOut" mode="out-in")
                v-btn(floating large primary light @click.native="login" v-if="!currentUser", :disabled="userLoading > 0")
                    v-icon(light) vpn_key
                img.user--avatar(:src="currentUser.image", @click="$router.push({name: 'current_user'})" v-else)
        main.pt-0
            .flexbox.vh-100-min(style="background: linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.6)), url('https://www.inovies.com/post-images/blog/trendy-web-design-inovies-8742trendy-web-design.gif') center center / cover no-repeat fixed")
                .m-a
                    .display-3.white--text.text-xs-center DevWebTuts
            .vh-100-min.pb-5
                hr(v-if="!loading")
                v-progress-linear(indeterminate v-else)
                articles(:articles="articles" v-if="!loading")
        v-footer
            .text-xs-right
                | &copy; Group 8

</template>

<script>
    import gql from '../gql';
    import {mapActions} from 'vuex';

    export default {
        name: 'home',
        props: ['currentUser', 'userLoading'],
        data() {
            return {
                scrolled: false,
                loading: 0
            }
        },
        apollo: {
            articles: {
                query: gql.queries.articles,
                fetchPolicy: 'cache-and-network',
                loadingKey: 'loading'
            },
        },
        methods: {
            ...mapActions([
                'login'
            ]),
        }
    }
</script>

