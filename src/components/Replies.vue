<template lang="pug">
    v-container(fluid).pa-2
        v-subheader Replies ({{replies.length}})
        .ml-5
            .flexbox(v-if="auth.currentUser")
                v-avatar
                    img(:src="auth.currentUser.image")
                .text-xs-left.pa-3
                    .subheading {{auth.currentUser.firstName}} {{auth.currentUser.lastName}}
                v-spacer
                v-btn(primary fab small dark @click.native="createReply")
                    v-icon send
            v-text-field(hide-details multi-line v-model="body" label="Write a Reply", :rows="1")
            reply(:reply="r", :key="index", v-for="(r,index) in replies")  
</template>

<script>
    import gql from '../gql';
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
                if (!this.auth.currentUser || !this.body || !this.comment) return;
                await this.$apollo.mutate({
                    mutation: gql.mutations.createReply,
                    variables: {
                        body: this.body,
                        userId: this.auth.currentUser.id,
                        commentId: this.comment
                    }
                })
                this.body = '';
            }
        }
    }
</script>
