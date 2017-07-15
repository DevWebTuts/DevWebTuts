<template lang="pug">
    div
        .vh-100-min.relative
            img.box.absolute(src="https://www.inovies.com/post-images/blog/trendy-web-design-inovies-8742trendy-web-design.gif")
            .box.absolute.ov
            .absolute.box.flexbox
                .display-3.white--text.text-xs-center.m-a.select--none Read and Write Tutorials
        .vh-100-min
            v-toolbar(flat dark).accent
                v-toolbar-title Articles ({{count ? count.count : 0}})
            articles(:articles="articles")
            v-progress-linear(indeterminate v-if="loading").ma-0
            .text-xs-center
                v-btn(primary @click.native="viewMore" v-if="canViewMore") View More

</template>

<script>
    import gql from '../gql';
    import { mapActions } from 'vuex';

    export default {
        name: 'home',
        inject: ['drawer', 'auth'],
        data() {
            return {
                scrolled: false,
                loading: 0,
                pageItems: 8,
                page: 1
            }
        },
        computed: {
            loadedItems() {
                return this.pageItems * this.page;
            },
            canViewMore() {
                return this.count ? this.loadedItems < this.count.count : false;
            }
        },
        apollo: {
            count: {
                query: gql.queries.articlesCount,
                fetchPolicy: 'cache-and-network',
                loadingKey: 'loading',
                variables() {
                    return {
                        search: this.auth.userSearch,
                    }
                }
            },
            articles: {
                query: gql.queries.articles,
                fetchPolicy: 'cache-and-network',
                loadingKey: 'loading',
                variables() {
                    return {
                        search: this.auth.userSearch,
                        first: 8,
                    }
                }
            },
        },
        methods: {
            viewMore() {
                this.page++;
                this.$apollo.queries.articles.fetchMore({
                    // New variables
                    variables: {
                        search: this.auth.userSearch,
                        first: this.loadedItems,
                    },
                    // Transform the previous result with new data
                    updateQuery: (previousResult, { fetchMoreResult: {articles} }) => {
                        console.log(previousResult,articles);
                        return {
                            articles
                        }
                    },
                })
            },
            ...mapActions([
                'login'
            ]),
        }
    }
</script>

