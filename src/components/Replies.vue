<template lang="pug">
    .layout-padding
        .headline Replies ({{replies.length}})
        .row(v-if="auth.currentUser")
            img.avatar(:src="auth.currentUser.image")
            .text-left
                .headline {{auth.currentUser.firstName}} {{auth.currentUser.lastName}}
            q-btn(color="primary" icon="send" small round @click="createReply")
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
