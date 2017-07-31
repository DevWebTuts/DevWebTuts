<template lang="pug">
    .row(style="min-height: calc(100vh - 100px)")
        .m-a(v-if="auth.userLoading")
            q-spinner(:size="100")
        .fit(v-else-if="auth.currentUser")
            div(style="padding: 16px")
                h3.text-secondary Articles ({{auth.currentUser.articleCount.count}})
                .title {{auth.currentUser.firstName}}
            articles(:articles="auth.currentUser.articles", :articlesLoading="loading")
        .m-a(v-else)
            h1.text-center Login now to create articles
            .text-center
                q-btn(style="width: 200px", color="primary" @click="$root.login()") Login
</template>

<script>
    export default {
        name: 'current-user',
        inject: ['auth'],
        data() {
            return {
                search: ''
            }
        }
    }
</script>
