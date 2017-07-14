<template lang="pug">
    .flexbox.vh-100-min.pt-5
        template(v-if="auth.userLoading")
            .m-a
                v-progress-circular(indeterminate, :size="100")
        template(v-else-if="auth.currentUser")
            .box
                .pa-3
                    .display-3.accent--text Articles ({{auth.currentUser.articleCount.count}})
                    .title {{auth.currentUser.firstName}}
                articles(:articles="auth.currentUser.articles")
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
