<template lang="pug">
    v-container(fluid).flexbox.vh-100-min
        template(v-if="userLoading")
            .m-a
                v-progress-circular(indeterminate, :size="100")
        template(v-else-if="currentUser")
            .box
                .display-3.pa-3 Articles
                articles(:articles="currentUser.articles" add)
        template(v-else)
            .m-a
                .display-1.text-xs-center You're Not Authenticated
</template>

<script>
    export default {
        name: 'current-user',
        props: ['currentUser', 'userLoading']
    }
</script>
