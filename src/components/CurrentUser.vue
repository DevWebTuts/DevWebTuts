<template lang="pug">
    .flexbox.vh-100-min
        template(v-if="userLoading")
            .m-a
                v-progress-circular(indeterminate, :size="100")
        template(v-else-if="currentUser")
            .box
                v-toolbar(light).accent
                    v-btn(light icon)
                        v-icon arrow_back
                    v-toolbar-title {{currentUser.firstName}}
                    v-text-field(v-model="search" hide-details label="Search" light)
                    v-btn(light icon @click.native="$store.dispatch('logout')")
                        v-icon exit_to_app
                .display-3.pa-3 Articles
                articles(:articles="currentUser.articles" add)
        template(v-else)
            .m-a
                .display-1.text-xs-center.primary--text You're Not Authenticated
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
