<template lang="pug">

    .row.window-height(v-if="loading")
        .m-a
            q-spinner-gears(:size="200" color="primary")
    .vh-100-min(v-else-if="article")
        .bg-primary.relative-position.window-height(v-if="!edit", key="headline")
            .parallax-attribs.fit.absolute(v-lazy:background-image="article.image")
            .row.fit.absolute.ov
                .m-a.text-center(style="z-index: 5")
                    h2.text-white {{article.title}}
                    img.author(v-lazy="article.user.image", @click="$router.push({name: 'user', params: {id: article.user.id}})")
                    h4.text-white {{article.user.firstName}} {{article.user.lastName}}
                    h6.text-grey-5 Created {{article.createdAt | moment("from")}}
                    h6.text-grey-5 Updated {{article.updatedAt | moment("from")}}
                    .row(style="width: 300px").justify-around.m-a
                        q-btn(color="white" icon="edit" round outline v-if="canEdit", @click="editArticle")
                        q-btn(color="white" icon="share" round outline @click.native="shareArticle")
                        q-btn(color="white" icon="delete" round outline v-if="canEdit")
                            q-popover(ref="deleteArticlePopover")
                                .bg-error(style="padding: 16px")
                                    .title.white--text Delete Article
                                div(style="padding: 16px")
                                    q-field(icon="vpn_key")
                                        q-input(v-model="deleteVerification" float-label="Article Title")
                                    q-btn.full-width(color="negative", @click="deleteArticle", :disabled="deleteVerification !== article.title" loader) Delete

        template(v-else)
            q-toolbar
                .cursor-pointer(:style="{background: `url(${article.image}) center center / contain no-repeat`}" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid white")
                    q-popover(ref="articleImage")
                        q-toolbar
                            q-toolbar-title Article image
                        div(style="padding: 16px")
                            q-field(icon="add_a_photo")
                                q-input(v-model="article.image" float-label="Article Image")
                q-toolbar-title
                    q-field(icon="title" dark)
                        q-input(v-model="article.title" dark float-label="Title")
                q-btn(color="warning" outline round small icon="undo", @click="undoEdit")
                q-btn(color="positive" outline round small loader @click="updateArticle" icon="save")



        .row
            .col-xs-12.col-sm-6(v-if="edit")
                q-card
                    code-mirror.markdown--editor(v-model="article.body", mode="text/x-gfm" key="editor", @save="updateArticle")
            .col-xs-12(:class="edit ? 'col-sm-6' : 'col-sm-12'").pa-0
                q-card(key="preview" v-if="article.body").article-preview.roboto
                    q-card-main(v-html="result")
                comments(v-if="!edit", :comments="article.comments", :article="article.id")


</template>

<script>
import markedWorker from 'worker-loader!../worker.js'

const worker = new markedWorker();

export default {
    name: 'article',
    inject: ['auth'],
    props: ['id'],
    metaInfo() {
        return {
            title: this.article ? this.article.title : 'DevWebTuts',
            meta: [
                {
                    name: 'og:title',
                    content: this.article ? this.article.title : 'DevWebTuts'
                },
                {
                    name: 'og:image',
                    content: this.article ? this.article.image : ''
                },
                {
                    name: 'og:description',
                    content: "Read and Create your own tutorials to help other web developers."
                },
                {
                    name: 'og:url',
                    content: document.location.href
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
    data() {
        return {
            loading: 0,
            edit: false,
            result: '',
            article: {
                id: 0,
                title: '',
                body: '',
                image: '',
            },
            oldArticle: null,
            deleteVerification: '',
            popup: null,
        }
    },
    created() {
        worker.addEventListener('message', this.workerEvent)
    },
    destroyed() {
        worker.removeEventListener('message', this.workerEvent)
    },
    watch: {
        ['article.body'](val) {
            if (!this.edit) {
                this.loading = 1
            }
            worker.postMessage(val)
        }
    },
    methods: {
        workerEvent({ data }) {
            this.loading = 0
            this.result = data
        },
        editArticle() {
            this.oldArticle = { ...this.article }
            this.edit = true;
        },
        undoEdit() {
            this.article = { ...this.oldArticle }
            this.edit = false
        },
        shareArticle() {
            let article = {
                url: encodeURIComponent(document.location.href),
                title: encodeURIComponent(this.article.title),
                image: encodeURIComponent(this.article.image)
            }
            this.popup = window.open(`https://www.facebook.com/sharer/sharer.php?display=popup&u=${article.url}&title=${article.title}&picture=${article.image}`)
            this.popup.focus()
        },
        async deleteArticle(e, done) {
            try {
                if (this.deleteVerification !== this.article.title) return
                let { id } = this.article
                let { data } = await this.$apollo.mutate({
                    mutation: this.$gql.mutations.deleteArticle,
                    variables: {
                        id
                    }
                })
                this.deleteVerification = ''
                this.$q.events.$emit('app:auth')
                this.$q.events.$emit('app:showToast', 'Article Deleted Successfully', 'positive')
                this.$router.push({ name: 'current_user' })
            } catch (e) {
                this.$q.events.$emit('app:showToast', 'Error Deleting Article', 'negative')
            } finally {
                done()
            }
        },
        async updateArticle(e, done) {
            try {
                let { id, body, title, image, user } = this.article
                let { data } = await this.$apollo.mutate({
                    mutation: this.$gql.mutations.updateArticle,
                    variables: {
                        id,
                        body,
                        title,
                        image,
                    }
                })
                this.edit = false;
                await this.$apollo.queries.article.refetch()
                this.$q.events.$emit('app:showToast', 'Article Saved Successfully', 'positive')

                if (this.$route.query.action === 'edit') {
                    this.$router.replace({ name: 'article', params: { id: this.article.id } })
                }
            } catch (e) {
                this.$q.events.$emit('app:showToast', 'Error Saving Article', 'negative')
            } finally {
                done()
            }
        },
    },
    computed: {
        canEdit() {
            return this.auth.currentUser && this.article.user && this.article.user.id === this.auth.currentUser.id
        },
    },
    apollo: {
        article() {
            return {
                query: this.$gql.queries.article,
                pollInterval: 1000,
                variables() {
                    return {
                        id: this.id || 0
                    }
                },
                loadingKey: 'loading',
                result({ data: { article } }) {
                    if (article) {
                        this.article = { ...article };
                    }
                    this.edit = this.$route.query.action === 'edit' && this.canEdit
                }
            }
        }
    },
}
</script>

<style lang="stylus">
    .markdown--editor + .CodeMirror
        min-height 100%
        height 100% !important
</style>
