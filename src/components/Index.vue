<template lang="pug">
div
    .relative-position(style="height: calc(100vh - 100px)")
        img.fit.absolute(src="https://www.inovies.com/post-images/blog/trendy-web-design-inovies-8742trendy-web-design.gif")
        .fit.absolute.ov
        .absolute.fit.row
            h3.text-white.text-center.m-a.select--none #[span.text-info Dev]eloper #[span.text-warning Web] #[span.text-positive Tut]orial#[span.text-positive s]
        .absolute.text-center(style="bottom: 24px; left: 0; right: 0")
            q-btn(outline round icon="keyboard_arrow_down" color="white" )
    .window-height
        .row.justify-around
            .col-xs-4
                q-card
                    q-card-main Instructions Coming Soon
</template>

<script>
export default {
    name: 'index',
    inject: ['auth'],
    metaInfo() {
        return {
            title: 'DevWebTuts',
            meta: [
                {
                    name: 'description',
                    content: "Read and Create your own tutorials to help other web developers."
                },
                {
                    name: 'image',
                    content: "https://s-media-cache-ak0.pinimg.com/originals/c6/c0/d9/c6c0d9b4b1fbd9dc73296a58e2dfa37e.png"
                },
                {
                    itemprop: 'name',
                    content: "DevWebTuts"
                },
                {
                    itemprop: 'description',
                    content: "Read and Create your own tutorials to help other web developers."
                },
                {
                    itemprop: 'image',
                    content: "https://s-media-cache-ak0.pinimg.com/originals/c6/c0/d9/c6c0d9b4b1fbd9dc73296a58e2dfa37e.png"
                },
                {
                    name: 'og:title',
                    content: 'DevWebTuts'
                },
                {
                    name: 'og:image',
                    content: "https://s-media-cache-ak0.pinimg.com/originals/c6/c0/d9/c6c0d9b4b1fbd9dc73296a58e2dfa37e.png"
                },
                {
                    name: 'og:description',
                    content: "Read and Create your own tutorials to help other web developers."
                },
                {
                    name: 'og:url',
                    content: "https://devwebtuts.github.io/#/"
                },
                {
                    name: 'og:site_name',
                    content: "DevWebTuts"
                },
                {
                    name: 'og:type',
                    content: "website"
                },

            ]
        }
    },
}
</script>

