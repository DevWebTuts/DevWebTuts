<template lang="pug">
    div
        .relative-position(style="height: calc(100vh - 100px)")
            .parallax-attribs.fit.absolute(v-lazy:background-image="'/statics/bg.gif'", style="background-size: cover")
            .fit.absolute.ov
            .absolute.fit.row
                h3.text-white.text-center.m-a.select--none #[span.text-info Dev]eloper #[span.text-warning Web] #[span.text-positive Tut]orial#[span.text-positive s]
            .absolute.text-center(style="bottom: 24px; left: 0; right: 0")
                q-btn(outline round icon="keyboard_arrow_down" color="white" v-scroll-to="'#introduction'")
        #introduction
            h3.text-center What is DevWebTuts
            p.text-center.layout-padding
                | DevWebTuts stands for Developer Web Tutorials this is just for uniqueness. The purpose of the site is to allow users to have free references for #[br]
                | Web development that will be created by contributors or you for helping beginners to start developing for the web. #[br]
                | This site will also be updated weekly by the admins sharing new technologies or tools for the web.
            hr
        #features
            h2.text-center Features
            .row.layout-padding(style="padding-right: 80px; padding-left: 80px")
                .col-xs-12.col-sm-6.col-md-4(v-for="(feature,i) in features", :key="i")
                    q-card
                        q-toolbar
                            q-icon(:name="feature.icon")
                            q-toolbar-title {{feature.title}}
                        q-card-main(style="height: 150px").row
                            .m-a.text-center {{feature.description}}
</template>

<script>
    export default {
        name: 'index',
        inject: ['auth'],
        data() {
            return {
                features: [
                    {
                        title: 'Article Creation',
                        description: 'Creating an article on the site will help alot of readers to learn about web development this will surely create good discussions on the article',
                        icon: 'edit'
                    },
                    {
                        title: 'Facebook Authentication',
                        description: 'We used facebook as our authentication strategy including auth0 for secured logins and tracking unsual logins to our site',
                        icon: 'vpn_key'
                    },
                    {
                        title: 'Share Articles',
                        description: 'Share your articles and make discussions about the article you created',
                        icon: 'share'
                    },
                    {
                        title: 'Article Discussions',
                        description: 'Discuss the creation of others using our comment and reply system',
                        icon: 'comment'
                    },
                    {
                        title: 'Code Editor',
                        description: 'Use the code editor so you can preview and try out the codes on the articles',
                        icon: 'code'
                    },
                    {
                        title: 'Search Articles',
                        description: 'Realtime searching on the articles section that will surely help you to find out what you want to learn',
                        icon: 'search'
                    }
                ]
            }
        },
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
                    }

                ]
            }
        }
    }
</script>

