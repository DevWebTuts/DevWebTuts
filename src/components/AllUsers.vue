<template lang="pug">
    .vh-100-min(v-if="auth.currentUser.admin")
        q-toolbar(flat dark).accent
            q-toolbar-title Users ({{count ? count.count : 0}})
            q-search(icon="search" dark v-model="search" inverted)
        users(:users="users", :loading="offset === 1 && loading")
        q-progress(indeterminate color="secondary" v-if="offset > 1 && loading")
        .text-center(style="margin-bottom: 16px")
            q-btn(style="width: 200px;" color="primary" loader @click="loadMore" v-if="canViewMore") View More
    .row.window-height(v-else)
        .m-a.text-center
            h1 You're not an admin
</template>

<script>
export default {
    name: 'all-users',
    inject: ['auth'],
    data() {
        return {
            loading: 0,
            limit: 4,
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
    created() {
        this.$q.events.$on('app:users', this.refetch)
    },
    methods: {
        async refetch() {
            try {
                await this.$apollo.queries.users.refetch()
                await this.$apollo.queries.count.refetch()
                this.$q.events.$emit('app:showToast', 'Refetched Users Successfully', 'positive')
            } catch (e) {
                this.$q.events.$emit('app:showToast', 'Error Refetching Users', 'negative')
            }
        },
        async loadMore(e, done) {
            try {
                if (!this.canViewMore) return
                this.offset++
                await this.$apollo.queries.users.fetchMore({
                    variables: {
                        search: this.search,
                        first: this.loadedItems,
                    },
                    updateQuery: (previousResult, { fetchMoreResult: { users } }) => {
                        return {
                            users
                        }
                    },
                })

            } catch (e) {

            } finally {
                done()
            }
        },
    },
    apollo: {
        count() {
            return {
                query: this.$gql.queries.usersCount,
                fetchPolicy: 'cache-and-network',
                loadingKey: 'loading',
                variables() {
                    return {
                        search: this.search,
                    }
                }
            }
        },
        users() {
            return {
                loadingKey: 'loading',
                query: this.$gql.queries.users,
                variables: {
                    first: 4,
                    search: this.search
                }
            }
        }
    }
}
</script>
