<template lang="pug">
    .flexbox.vh-100-min.pt-5
        template(v-if="userLoading")
            .m-a
                v-progress-circular(indeterminate, :size="100")
        template(v-else-if="currentUser")
            .box
                .pa-3
                    .display-3.accent--text Articles
                    .title {{currentUser.firstName}}
                articles(:articles="currentUser.articles")
</template>

<script>
    export default {
        name: 'current-user',
        props: ['currentUser', 'userLoading'],
        data() {
            return {
                search: ''
            }
        }
    }
</script>
