<template lang="pug">
    .bg-primary
        .relative-position.gt-xs(style="min-height: calc(100vh - 52px)")
            .parallax-attribs.fit.absolute(v-lazy:background-image="'/statics/bg.gif'", style="background-size: cover")
            .absolute.fit.row.ov
                .text-center.m-a.select--none
                    img(v-lazy="'/statics/logo.png'" style="width: 60%; height: 60%;")
                    h3.text-white #[span.text-info Dev]eloper #[span.text-warning Web] #[span.text-positive Tut]orial#[span.text-positive s]
            .absolute.text-center(style="bottom: 24px; left: 0; right: 0")
                q-btn(outline round icon="keyboard_arrow_down" color="white" v-scroll-to="'#features'")

        .relative-position.xs(style="min-height: calc(100vh - 52px)")
            .parallax-attribs.fit.absolute(v-lazy:background-image="'/statics/bg.gif'", style="background-size: cover")
            .absolute.fit.row.ov
                .text-center.m-a.select--none
                    img(v-lazy="'/statics/logo.png'" style="width: 35%; height: 35%;")
                    h5.text-white #[span.text-info Dev]eloper #[span.text-warning Web] #[span.text-positive Tut]orial#[span.text-positive s]
            .absolute.text-center(style="bottom: 24px; left: 0; right: 0")
                q-btn(outline round icon="keyboard_arrow_down" color="white" v-scroll-to="'#features'")

        q-carousel.bg-primary#features(arrows dots fullscreen).text-white
            div(slot="slide" v-for="(feature,i) in features")
                .gt-xs
                    .text-center
                        q-icon.text-center(color="secondary", :name="feature.icon" size="5rem" style="border-radius: 50%; border: white solid 1px; padding: 8px")
                    h1.text-center.text-secondary {{feature.title}}
                    h5.text-center {{feature.description}}
                .xs
                    .text-center
                        q-icon.text-center(color="secondary", :name="feature.icon" size="2rem" style="border-radius: 50%; border: white solid 1px; padding: 8px")
                    h5.text-center.text-secondary {{feature.title}}
                    .text-center {{feature.description}}
                q-card
                    q-card-media
                        img(v-lazy="feature.image")
        #team(style="min-height: 100vh;")
            h1.text-center.text-secondary Our Team
            .row.xs-gutter.layout-padding
                .col-xs-12.col-sm-6.col-md-4(v-for="(member,i) in members", :key="i")
                    q-card
                        q-card-media(overlay-position="full" style="max-height: 500px")
                            img(v-lazy="member.image").fit
                            q-card-title(slot="overlay") {{member.name}}
                                span(slot="subtitle") {{member.role}}

</template>

<script>
    export default {
        name: 'index',
        inject: ['auth'],
        data() {
            return {
                members: [
                    {
                        name: 'Ralph Christian Eclipse',
                        role: 'Web Developer',
                        image: 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t1.0-9/11796216_1175820312443445_6278156916354891556_n.jpg?oh=8a5e74e3685eed7b9b274ba145191c6c&oe=5A367657'
                    },
                    {
                        name: 'Juzel Ann Bernardo',
                        role: 'Project Manager',
                        image: 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t1.0-9/18194903_1373939229361407_5978042126860386899_n.jpg?oh=66266feacce211178dcded8e6efc6dcc&oe=5A21547C'
                    },
                    {
                        name: 'Aaron John Sapnay',
                        role: 'Content Writer',
                        image: 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t1.0-9/20429790_1490493674340658_5682547908317723515_n.jpg?oh=295007baff06d0a7e16d264a66b0582b&oe=5A20D72E'
                    },
                    {
                        name: 'Rommel Reonico',
                        role: 'Content Writer',
                        image: 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t1.0-9/17201367_1806977715994774_1458864594794412036_n.jpg?oh=8ca0efbbcba8dc6fac4c51e10a4a9916&oe=5A36A621'
                    },                    {
                        name: 'Arianne Alejandrino',
                        role: 'Content Writer',
                        image: 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t1.0-9/20708108_1184415161704315_7545032159394840596_n.jpg?oh=29b2069fba2fa6fec9ce8557c6fffe1b&oe=5A387E1E'
                    },                    {
                        name: 'John Paul Gonzales',
                        role: 'Content Writer',
                        image: 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t1.0-9/18342041_1790122557968233_7106546273667414628_n.jpg?oh=dfef490ee3c30412be95a56d1267a65a&oe=5A340D1D'
                    },
                ],
                features: [
                    {
                        title: 'Article Creation',
                        image: '/statics/article-creation.png',
                        description: 'Creating an article on the site will help alot of readers to learn about web development this will surely create good discussions on the article',
                        icon: 'edit'
                    },
                    {
                        title: 'Facebook Authentication',
                        image: '/statics/facebook-authentication.png',
                        description: 'We used facebook as our authentication strategy including auth0 for secured logins and tracking unsual logins to our site',
                        icon: 'vpn_key'
                    },
                    {
                        title: 'Share Articles',
                        image: '/statics/share-articles.png',
                        description: 'Share your articles and make discussions about the article you created',
                        icon: 'share'
                    },
                    {
                        title: 'Article Discussions',
                        image: '/statics/article-discussions.png',
                        description: 'Discuss the creation of others using our comment and reply system',
                        icon: 'comment'
                    },
                    {
                        title: 'Code Editor',
                        image: '/statics/code-editor.png',
                        description: 'Use the code editor so you can preview and try out the codes on the articles. This also supports auto completion and auto close brackets',
                        icon: 'code'
                    },
                    {
                        title: 'Search Articles',
                        image: '/statics/search-article.png',
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

