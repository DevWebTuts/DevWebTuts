<template lang="pug">
    q-card
        q-toolbar(@click="$router.push({name: 'user', params: {id: user.id}})").cursor-pointer
            q-toolbar-title
                | {{user.firstName}} {{user.middleName}}, {{user.lastName}}
                span(slot="subtitle") Registered At: {{user.createdAt | moment("from")}}
            //q-btn(outline color="negative" round small icon="delete")
        q-card-media(style="height: 300px; width 100%")
            img(:src="user.image").fit
        
</template>

<script>
export default {
    name: 'user-card',
    props: ['user'],
}
</script>
