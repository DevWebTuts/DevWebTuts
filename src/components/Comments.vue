<template lang="pug">
    v-container(fluid).pa-2
        v-subheader Comments ({{comments.length}})
        .flexbox(v-if="auth.currentUser")
            v-avatar
                img(:src="auth.currentUser.image")
            .text-xs-left.pa-3
                .subheading {{auth.currentUser.firstName}} {{auth.currentUser.lastName}}
            v-spacer
            v-btn(primary fab small dark @click.native="createComment")
                v-icon send
        v-text-field(hide-details multi-line v-model="body" label="Write a Comment", :rows="1")
        comment(:comment="c", :key="index", v-for="(c,index) in comments")  
</template>

<script>
    import gql from '../gql';
    export default {
        name: 'comments',
        inject: ['auth'],
        props: ['comments', 'article'],
        data() {
            return {
                body: ''
            }
        },
        methods: {
            async createComment() {
                if (!this.auth.currentUser || !this.body || !this.article) return;
                await this.$apollo.mutate({
                    mutation: gql.mutations.createComment,
                    variables: {
                        body: this.body,
                        userId: this.auth.currentUser.id,
                        articleId: this.article
                    }
                })
                this.body = '';
            }
        }
    }
</script>
