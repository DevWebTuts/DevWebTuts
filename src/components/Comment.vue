<template lang="pug">
    q-card
        q-toolbar
            img.cursor-pointer.avatar(:src="comment.user.image", @click="$router.push({name: 'user',params: {id: comment.user.id}})")
            q-toolbar-title
                |{{comment.user.firstName}}
                span(slot="subtitle") {{comment.createdAt | moment("from")}}
        q-card-main {{comment.body}}
        replies(:replies="comment.replies", :comment="comment.id")

</template>

<script>
export default {
    name: 'comment',
    props: ['comment'],
}
</script>
