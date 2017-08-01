<template lang="pug">
    q-card
        q-card-media.cursor-pointer(overlay-position="full" @click.stop="$router.push({name: 'article',params: {id: article.id}})")
            img(:src="article.image" style="height: 300px").full-width
            q-card-title(slot="overlay") {{article.title}}
        q-toolbar.cursor-pointer
            img.avatar(:src="article.user.image", @click.stop="$router.push({name: 'user', params: {id: article.user.id}})")
            q-toolbar-title 
                | {{article.user.firstName}} {{article.user.lastName}}
                span(slot="subtitle") {{article.createdAt | moment("dddd, MMMM Do YYYY")}}
            q-btn(round small outline loader, :icon="article.published ?  'visibility' : 'visibility_off'" @click="visible" v-if="canChangeVisibility")
</template>

<script>
export default {
    name: 'article-card',
    inject: ['auth'],
    props: ['article'],
    computed: {
        canChangeVisibility() {
            return this.auth.currentUser ? this.$route.name === 'user' ? this.auth.currentUser.admin || (this.auth.currentUser.id === this.$route.params.id) : (this.auth.currentUser.admin || this.$route.name === 'current_user') : false
        }
    },
    methods: {
        async visible(e, done) {
            try {
                let { data } = await this.$apollo.mutate({
                    mutation: this.$gql.mutations.updateArticle,
                    variables: {
                        id: this.article.id,
                        published: !this.article.published
                    },
                    update: (store) => {
                        console.log(store)
                        if (this.$route.name === 'current_user') {
                            const { currentUser } = store.readQuery({
                                query: this.$gql.queries.currentUser,
                            })

                            let [article, index] = this.findArticle(currentUser.articles)
                            currentUser.articles.splice(index, 1, article)

                            store.writeQuery({ query: this.$gql.queries.currentUser, data: { currentUser } })
                        } else if (this.$route.name === 'user') {
                            const { user } = store.readQuery({
                                query: this.$gql.queries.user,
                                variables: {
                                    id: this.$route.params.id
                                }
                            })

                            let [article, index] = this.findArticle(user.articles)
                            user.articles.splice(index, 1, article)

                            store.writeQuery({ query: this.$gql.queries.user, data: { user } })
                        }

                    },

                })
                this.$q.events.$emit('app:showToast', 'Successfully changed visibility of article', 'positive')
            } catch (error) {
                this.$q.events.$emit('app:showToast', 'Error setting article visibility', 'negative')
            } finally {
                done()
            }
        },
        findArticle(articles) {
            let index = articles.findIndex(article => article.id === this.article.id),
                article = articles[index]
            article.published = !this.article.published
            return [article, index]
        }
    }
}
</script>
