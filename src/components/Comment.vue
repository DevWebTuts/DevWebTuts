<template lang="pug">
    v-card
        v-card-title.primary.white--text
            v-avatar
                img(:src="comment.user.image")
            .px-3 
                | {{comment.user.firstName}}
                .caption {{comment.createdAt | moment("from")}}
        v-card-text
            p {{comment.body}}
        v-subheader Replies
            v-spacer
            v-btn(primary light @click.native="saveReply") Reply
        v-container(fluid)
            v-text-field(label="Reply" v-model="reply.body" hide-details)
        replies(:replies="comment.replies")  
</template>

<script>
import gql from '../gql';

export default {
    name: 'comment',
    props: ['comment','currentUser'],
    data() {
        return {
            reply: {
                id: 0,
                body: '',
                userId: 0,
                commentId: 0
            }
        }
    },
    methods: {
        async saveReply() {
            if(!this.currentUser && !this.comment && !this.reply.body) return;
            console.log(this.currentUser,this.comment);
            this.reply.userId = this.currentUser.id;
            this.reply.commentId = this.comment.id
            console.log(this.reply);
            let {data} = await this.$apollo.mutate({
                mutation: gql.mutations.saveReply,
                variables: this.reply
            })
            this.reply.body = '';
        },
    }
}
</script>
