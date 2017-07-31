<template lang="pug">
    .layout-padding
        .headline Comments ({{comments.length}})
        .row(v-if="auth.currentUser")
            img.avatar(:src="auth.currentUser.image")
            .text-left
                .headline {{auth.currentUser.firstName}} {{auth.currentUser.lastName}}
            q-btn(color="primary" icon="send" small round @click="createComment")
        q-field(icon="edit" v-if="auth.currentUser")
            q-input(type="textarea" v-model="body" float-label="Write a Comment")
        q-btn.full-width(color="primary" v-else @click="$root.login()") Login
        comment(:comment="c", :key="index", v-for="(c,index) in comments")  
</template>

<script>
    export default {
        name: 'comments',
        inject: ['auth'],
        props: ['comments', 'article', 'loading'],
        data() {
            return {
                body: ''
            }
        },
        methods: {
            async createComment() {
                if (!this.auth.currentUser || !this.body || !this.article) return
                await this.$apollo.mutate({
                    mutation: this.$gql.mutations.createComment,
                    variables: {
                        body: this.body,
                        userId: this.auth.currentUser.id,
                        articleId: this.article
                    }
                })
                this.body = ''
            }
        }
    }
</script>
