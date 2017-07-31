<template lang="pug">
    .vh-100-min
        q-toolbar(flat dark).accent
            q-toolbar-title Articles ({{count ? count.count : 0}})
            q-search(icon="search" dark v-model="search" inverted)
        articles(:articles="articles", :loading="loading")
        .text-center(style="margin-bottom: 16px")
            q-btn(style="width: 200px;" color="primary" loader @click="loadMore" v-if="canViewMore") View More
</template>

<script>
    export default {
        name: 'all-articles',
        data() {
            return {
                scrolled: false,
                loading: 0,
                pageItems: 8,
                page: 1,
                search: ''
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
            count() {
                return {
                    query: this.$gql.queries.articlesCount,
                    fetchPolicy: 'cache-and-network',
                    loadingKey: 'loading',
                    variables() {
                        return {
                            search: this.search,
                        }
                    }
                }
            },
            articles() {
                return {
                    query: this.$gql.queries.articles,
                    fetchPolicy: 'cache-and-network',
                    loadingKey: 'loading',
                    variables() {
                        return {
                            search: this.search,
                            first: 8,
                        }
                    }
                }
            },
        },
        methods: {
            async loadMore(e, done) {
                if (!this.canViewMore) return
                this.page++
                await this.$apollo.queries.articles.fetchMore({
                    // New variables
                    variables: {
                        search: this.search,
                        first: this.loadedItems,
                    },
                    // Transform the previous result with new data
                    updateQuery: (previousResult, { fetchMoreResult: { articles } }) => {
                        return {
                            articles
                        }
                    },
                })
                done()
            },
        }
    }
</script>
