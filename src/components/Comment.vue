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
            v-btn(primary light prepend-icon="send") Reply
        v-container(fluid)
            v-text-field(label="Reply" v-model="reply.body" hide-details)
        replies(:replies="comment.replies")  
</template>

<script>
export default {
    name: 'comment',
    props: ['comment'],
    data() {
        return {
            reply: {
                id: 0,
                body: ''
            }
        }
    }
}
</script>
