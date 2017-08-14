<template lang="pug">
    .masonry(style="padding: 8px" v-if="!loading")
        q-transition(group appear appear-enter="bounceInUp" appear-leave="bounceOutDown" enter="bounceInUp" leave="bounceOutDown")
            .masonry-item(v-for="(article,index) in articles", :key="index")
                article-card(:article="article")
    .row(style="min-height: calc(100vh - 212px)" v-else-if="loading")
        .m-a
            q-spinner-gears(:size="200" color="primary")
</template>

<script>
import 'quasar-extras/animate/bounceOutDown.css'
import 'quasar-extras/animate/bounceInUp.css'
export default {
    name: 'articles',
    props: ['articles', 'loading'],
}
</script>
