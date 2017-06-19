<template lang="pug">
    v-container(fluid) 
        v-layout(row wrap)
            v-flex(xs12 sm6 md3 lg2
                @click="$router.push({name: 'article',params: {id: article.id}})"
                v-for="(article,index) in articles",
                :key="index").mb-4
                v-card(hover height="300px")
                    img.absolute.box(:src="article.image")
                    .title.white--text.box.absolute.ov--hover.pa-3.text-xs-center 
                        .relative {{article.title}}  
</template>

<script>
    export default {
        name: 'articles',
        props: ['articles']
    }
</script>


<style lang="stylus">
	.ov--hover
		transition all 1s
		line-height 268px
		font-size 0px
		&:hover
			opacity 1
			font-size 16px
			background rgba(0,0,0,.5)
</style>
