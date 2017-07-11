<template lang="pug">
div
    .vh-100-min.relative
        img.box.absolute(src="https://www.inovies.com/post-images/blog/trendy-web-design-inovies-8742trendy-web-design.gif")
        .box.absolute.ov
        .absolute.box.flexbox
            .display-3.white--text.text-xs-center.m-a.select--none Read and Write Tutorials
    .vh-100-min.pb-5
        hr(v-if="!loading")
        v-progress-linear(indeterminate v-else)
        articles(:articles="articles" v-if="!loading")

</template>

<script>
    import gql from '../gql';
    import { mapActions } from 'vuex';

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

