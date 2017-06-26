<template lang="pug">
    v-card
        v-card-title.accent.white--text
            v-avatar
                img(:src="reply.user.image")
            .px-3 
                | {{reply.user.firstName}}
                .caption {{reply.createdAt | moment("from")}}
        v-card-text
            p {{reply.body}}
</template>

<script>
    export default {
        name: 'reply',
        props: ['reply']
    }
</script>
