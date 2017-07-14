<template lang="pug">
    v-card(flat)
        v-card-title(primary-title).accent.white--text.pa-2
            .flexbox
                v-avatar.pr-3
                    img.pointer(:src="comment.user.image", @click="$router.push({name: 'user',params: {id: comment.user.id}})")
                .text-xs-left
                    .subheading {{comment.user.firstName}}
                    .caption.grey--text {{comment.createdAt | moment("from")}}
        v-card-text {{comment.body}}
        hr
        replies(:replies="comment.replies", :comment="comment.id")

</template>

<script>
    export default {
        name: 'comment',
        props: ['comment'],
    }
</script>
