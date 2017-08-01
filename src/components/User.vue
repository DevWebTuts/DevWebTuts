<template lang="pug">
    .row.vh-100-min
        .m-a(v-if="loading")
            q-spinner(:size="100")
        .fit(v-else-if="user")
            div(style="padding: 16px")
                h3.text-secondary Articles ({{user.articleCount.count}})
                .title {{user.firstName}}
            articles(:articles="user.articles", :articlesLoading="loading")
</template>

<script>
export default {
    name: 'user',
    props: ['id'],
    data() {
        return {
            loading: 0,
            user: null,
            search: ''
        }
    },
    metaInfo() {
        return {
            title: this.user ? this.user.firstName : 'DevWebTuts'
        }
    },
    apollo: {
        user() {
            return {
                query: this.$gql.queries.user,
                loadingKey: 'loading',
                variables() {
                    return {
                        id: this.id
                    }
                },
            }
        }
    }
}
</script>
