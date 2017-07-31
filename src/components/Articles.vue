<template lang="pug">
    .row.xs-gutter(style="padding: 8px" v-if="!loading")
        .col-xs-12.col-sm-6.col-md-4.col-lg-3(
            @click="$router.push({name: 'article',params: {id: article.id}})"
            v-for="(article,index) in articles",
            :key="index")
            article-card(:article="article")
    .row(style="min-height: calc(100vh - 100px)" v-else)
        .m-a
            q-spinner-gears(:size="200" color="primary")
</template>

<script>
    export default {
        name: 'articles',
        props: ['articles', 'loading'],
    }
</script>
