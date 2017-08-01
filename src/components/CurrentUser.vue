<template lang="pug">
    .row(style="min-height: calc(100vh - 100px)")
        .m-a(v-if="auth.userLoading")
            q-spinner(:size="100")
        .fit(v-else-if="auth.currentUser")
            q-dialog(ref="newArticleDialog" maximized)
                q-toolbar
                    q-toolbar-title New Article
                    q-btn(icon="close" small round outline @click="$refs.newArticleDialog.close()")
                    q-btn(icon="save" small color="secondary" loader round outline @click="createArticle")
                
                q-field(icon="title")
                    q-input(v-model="article.title" float-label="Title")
                q-field(icon="add_a_photo")
                    q-input(v-model="article.image" float-label="Image")
                .text-center
                    img(:src="article.image", style="height: 300px; width: 300px")
            q-btn.fixed-bottom-right(round icon="add" color="primary" style="bottom: 70px; right: 18px;" @click="$refs.newArticleDialog.open()")
            div(style="padding: 16px")
                h3.text-secondary Articles ({{auth.currentUser.articleCount.count}})
                h5 {{auth.currentUser.firstName}}
            articles(:articles="auth.currentUser.articles")
        .m-a(v-else)
            h1.text-center Login now to create articles
            .text-center
                q-btn(style="width: 200px", color="primary" @click="$root.login()") Login
</template>

<script>
export default {
    name: 'current-user',
    inject: ['auth'],
    data() {
        return {
            search: '',
            article: {
                title: '',
                body: '',
                image: ''
            }
        }
    },
    methods: {
        async createArticle(e, done) {
            try {
                let { title, body, image } = this.article;
                if (!title || !this.auth.currentUser) return;
                let { data } = await this.$apollo.mutate({
                    mutation: gql.mutations.createArticle,
                    variables: {
                        title,
                        body,
                        image,
                        userId: this.auth.currentUser.id
                    }
                })
                this.$q.events.$emit('Created new article', 'positive')
                this.$router.push({ name: 'article', params: { id: data.article.id }, query: { action: 'edit' } })
            } catch (e) {
                this.$q.events.$emit('Failed creating new article', 'negative')
            } finally {
                done()
                this.$refs.newArticleDialog.close()
            }
        },
    }
}
</script>
