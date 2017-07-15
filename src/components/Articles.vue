<template lang="pug">
    v-container(fluid).pa-2
        v-layout(row wrap)
            v-flex(xs12 sm6, :class="[drawer.open && !drawer.mini ? 'md4' : 'md3']"
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
                    v-list(dark two-line @click.native.stop="$router.push({name: 'user', params: {id: article.user.id}})").accent.pa-0
                        v-list-tile(avatar)
                            v-list-tile-avatar
                                img(:src="article.user.image")
                            v-list-tile-content
                                v-list-tile-title {{article.user.firstName}} {{article.user.lastName}}
                                v-list-tile-sub-title {{article.createdAt | moment("dddd, MMMM Do YYYY")}}
</template>

<script>
    export default {
        name: 'articles',
        props: ['articles'],
        inject: ['drawer'],
    }
</script>
