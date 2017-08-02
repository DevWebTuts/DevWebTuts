<template lang="pug">
    .row.xs-gutter(style="padding: 8px" v-if="!loading")
        .col-xs-12.col-sm-6.col-md-4.col-lg-3(v-for="(user,i) in users",:key="i")
            user-card(:user="user")
    .row(style="min-height: calc(100vh - 212px)" v-else-if="loading")
        .m-a
            q-spinner-gears(:size="200" color="primary")
</template>

<script>
export default {
    name: 'users',
    props: ['users', 'loading'],

}
</script>
