<template lang="pug">
    .flexbox.vh-100-min
        template(v-if="loading")
            .m-a
                v-progress-circular(indeterminate, :size="100")
        template(v-else-if="user")
            .box(style="padding-top: 48px;")
                .pa-3
                    .display-3.accent--text Articles ({{user.articleCount.count}})
                    .title {{user.firstName}}
                articles(:articles="user.articles" add)
</template>

<script>
    import gql from '../gql'
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
                title: user ? user.firstName : 'DevWebTuts'
            }
        },
        apollo: {
            user: {
                query: gql.queries.user,
                loadingKey: 'loading',
                variables() {
                    return {
                        id: this.id
                    }
                },
            }
        }
    }
</script>
