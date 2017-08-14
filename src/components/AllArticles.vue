<template lang="pug">
    .vh-100-min
        q-toolbar(flat dark).accent
            q-toolbar-title Articles ({{count ? count.count : 0}})
            q-search(icon="search" dark v-model="search" inverted)
        articles(:articles="articles", :loading="offset === 1 && loading")
        q-progress(indeterminate color="secondary" v-if="offset > 1 && loading")
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
            limit: 16,
            offset: 1,
            search: ''
        }
    },
    computed: {
        loadedItems() {
            return this.limit * this.offset;
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
                        first: 16,
                    }
                }
            }
        },
    },
    methods: {
        async loadMore(e, done) {
            try {
                if (!this.canViewMore) return
                this.offset++
                await this.$apollo.queries.articles.fetchMore({
                    variables: {
                        search: this.search,
                        first: this.loadedItems,
                    },
                    updateQuery: (previousResult, { fetchMoreResult: { articles } }) => {
                        return {
                            articles
                        }
                    },
                })

            } catch (e) {

            } finally {
                done()
            }
        },
    }
}
</script>
