<template lang="pug">
    v-container(fluid) 
        v-layout(row wrap)
            v-flex(xs12 sm6 md3
                @click="$router.push({name: 'article',params: {id: article.id}})"
                v-for="(article,index) in articles",
                :key="index").mb-2
                v-card(hover)
                    .relative(style="height: 300px")
                        img(:src="article.image").box.absolute
                        v-container(fill-height fluid).ov.absolute
                            v-layout(fill-height)
                                v-flex(xs12 align-end flexbox)
                                    span.headline.white--text {{article.title}}
                    v-card-text.accent
                        .flexbox
                            img.author(:src="article.user.image" @click.stop="$router.push({name: 'user', params: {id: article.user.id}})")
                            v-card-text
                                .subheading.white--text {{article.user.firstName}} {{article.user.lastName}}
                                .caption.grey--text {{article.user.createAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
</template>

<script>
    export default {
        name: 'articles',
        props: ['articles'],
    }
</script>
