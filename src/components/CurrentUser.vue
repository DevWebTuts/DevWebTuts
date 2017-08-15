<template lang="pug">
    .row(style="min-height: calc(100vh - 100px); padding:")
        .m-a(v-if="auth.userLoading")
            q-spinner-gears(:size="200", color="primary")
        .fit(v-else-if="auth.currentUser")
            q-modal(ref="newArticleDialog")
                q-toolbar
                    q-toolbar-title New Article
                    q-btn(icon="close" small round outline @click="$refs.newArticleDialog.close()")
                    q-btn(icon="save" small loader round outline @click="createArticle")
                div(style="padding: 24px")
                    q-field(icon="title")
                        q-input(v-model="article.title" float-label="Title")
                    .text-center
                        img(:src="article.image", style="height: 300px; width: 300px")
                    q-field(icon="add_a_photo")
                        q-input(v-model="article.image" float-label="Image")
            q-btn.fixed-bottom-right.z-absolute(round icon="add" color="primary" style="bottom: 18px; right: 18px; z-index: 5", @click="$refs.newArticleDialog.open()")
            div(style="padding: 16px")
                h3.text-secondary Articles ({{auth.currentUser.articleCount.count}})
                h5 {{auth.currentUser.firstName}}
            articles(:articles="auth.currentUser.articles", style="padding-bottom: 80px")
        .m-a(v-else)
            h1.text-center Login now to create articles
            .text-center
                q-btn(style="width: 200px", color="primary", @click="$root.login()") Login
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
                let { title, body, image } = this.article
                if (!title || !this.auth.currentUser) return
                console.log(this.article)
                let { data } = await this.$apollo.mutate({
                    mutation: this.$gql.mutations.createArticle,
                    variables: {
                        title,
                        body,
                        image,
                        userId: this.auth.currentUser.id
                    }
                })
                console.log(data)
                this.$q.events.$emit('Created new article', 'positive')
                this.$refs.newArticleDialog.close()
                this.$router.push({ name: 'article', params: { id: data.article.id }, query: { action: 'edit' } })
            } catch (e) {
                this.$q.events.$emit('Failed creating new article', 'negative')
            } finally {
                done()
            }
        },
    }
}
</script>
