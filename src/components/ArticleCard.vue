<template lang="pug">
    q-card
        q-card-media.cursor-pointer(overlay-position="full")
            img(:src="article.image" style="height: 300px").full-width
            q-card-title(slot="overlay") {{article.title}}
        q-toolbar.cursor-pointer(@click.stop="$router.push({name: 'user', params: {id: article.user.id}})")
            img.avatar(:src="article.user.image")
            q-toolbar-title 
                | {{article.user.firstName}} {{article.user.lastName}}
                span(slot="subtitle") {{article.createdAt | moment("dddd, MMMM Do YYYY")}}
</template>

<script>
    export default {
        name: 'article-card',
        props: ['article']
    }
</script>
