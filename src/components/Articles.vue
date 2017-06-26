<template lang="pug">
    v-container(fluid) 
        v-layout(row wrap)
            v-flex(xs12 sm6 md3 key="add" v-if="add" @click="$router.push({name: 'create_article'})").mb-4
                v-card(hover height="300px").article
                    img.box.absolute(src="http://www.mangrol.com/images/products/writing/online-writing/full%20size/online_article.jpeg")
                    .box.absolute.article--overlay
                    .absolute.flexbox.box
                        .m-a
                            .title.white--text.text-xs-center Create New Article
            v-flex(xs12 sm6 md3
                @click="$router.push({name: 'article',params: {id: article.id}})"
                v-for="(article,index) in articles",
                :key="index").mb-4
                v-card(hover height="300px").article
                    img.box.absolute.article--image(:src="article.image")
                    .box.absolute.article--overlay
                    .absolute.flexbox.box(style="flex-direction: column; align-items: center; justify-content: center;")
                        img.article--author(v-if="article.user", :src="article.user.image", style="height: 100px; width: 100px; border-radius: 100%; border: 1px white solid;")
                        .title.white--text.text-xs-center {{article.title}}
                            .caption(v-if="article.user") {{article.user.firstName}} {{article.user.middleName ? article.user.middleName[0].toUpperCase() : ''}} {{article.user.lastName}}

</template>

<script>
    export default {
        name: 'articles',
        props: ['articles','add'],
    }
</script>

<style lang="stylus">
    .article
        .title, .article--overlay, img
            transition all .6s
        .title
            font-size 0
        img.article--author,.caption
            opacity 0
        &:hover 
            img.article--image
                filter blur(5px)
            img.article--author,.caption
                opacity 1
            .title
                font-size 24px
            .article--overlay
                background rgba(0,0,0,.5)
</style>

