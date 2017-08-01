<template lang="pug">
    .layout-padding
        q-toolbar(v-if="auth.currentUser" color="secondary")
            img.avatar(:src="auth.currentUser.image")
            q-toolbar-title
                .headline {{auth.currentUser.firstName}} {{auth.currentUser.lastName}}
                span(slot="subtitle") Replies ({{replies.length}})
            q-btn(color="white" icon="send" outline small round @click="createReply")
        q-field(icon="edit" v-if="auth.currentUser")
            q-input(type="textarea" v-model="body" float-label="Write a Comment")
        reply(:reply="r", :key="index", v-for="(r,index) in replies") 

</template>

<script>
export default {
    name: 'replies',
    inject: ['auth'],
    props: ['replies', 'comment'],
    data() {
        return {
            body: ''
        }
    },
    methods: {
        async createReply() {
            if (!this.auth.currentUser || !this.body || !this.comment) return
            await this.$apollo.mutate({
                mutation: this.$gql.mutations.createReply,
                variables: {
                    body: this.body,
                    userId: this.auth.currentUser.id,
                    commentId: this.comment
                }
            })
            this.body = ''
        }
    }
}
</script>
