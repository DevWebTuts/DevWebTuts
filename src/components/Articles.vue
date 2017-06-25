<template lang="pug">
    v-container(fluid) 
        v-layout(row wrap)
            v-flex(xs12 sm6 md3 key="add" v-if="add").mb-4
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
                    img.box.absolute(:src="article.image")
                    .box.absolute.article--overlay
                    .absolute.flexbox.box
                         .m-a 
                            .title.white--text.text-xs-center {{article.title}}

</template>

<script>
    export default {
        name: 'articles',
        props: ['articles','add'],
        computed: {
        }
    }
</script>

<style lang="stylus">
    .article
        .title, .article--overlay, img
            transition all .6s
        .title
            font-size 0
        &:hover 
            img
                filter blur(5px)
            .title
                font-size 24px
            .article--overlay
                background rgba(0,0,0,.5)
</style>

