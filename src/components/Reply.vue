<template lang="pug">
    v-card(flat)
        v-card-title(primary-title).primary.white--text.pa-1
            .flexbox
                v-avatar.pr-3
                    img.pointer(:src="reply.user.image", @click="$router.push({name: 'user',params: {id: reply.user.id}})")
                .text-xs-left
                    .subheading {{reply.user.firstName}}
                    .caption.grey--text.text--lighten-3 {{reply.createdAt | moment("from")}}
        v-card-text {{reply.body}}
</template>

<script>
    export default {
        name: 'reply',
        props: ['reply']
    }
</script>
