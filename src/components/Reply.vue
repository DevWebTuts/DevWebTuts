<template lang="pug">
    q-card
        q-toolbar(color="secondary")
            img.cursor-pointer.avatar(:src="reply.user.image", @click="$router.push({name: 'user',params: {id: reply.user.id}})")
            q-toolbar-title
                |{{reply.user.firstName}}
                span(slot="subtitle") {{reply.createdAt | moment("from")}}
        q-card-main {{reply.body}}
</template>

<script>
export default {
    name: 'reply',
    props: ['reply']
}
</script>
