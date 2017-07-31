<template lang="pug">

    .row.window-height(v-if="loading")
        .m-a
            q-spinner-gears(:size="200" color="primary")
    .vh-100-min(v-else-if="article")
        template(v-if="edit")
            //.row(fluid v-if="edit" style="padding-top: 64px;")
                v-menu(offset-y, :close-on-content-click="false")
                    img(slot="activator", :src="article.image" style="height: 100px; width: 100px; cursor: pointer;").mr-4
                    .pa-2.primary
                        .title.white--text Article Image
                    v-container(fluid)
                        v-text-field(label="Image" v-model="article.image")
                v-text-field(v-model="article.title" hide-details dark label="Title")
            q-btn.fixed-bottom-right.z-absolute(style="bottom: 18px; right: 18px" color="primary" @click="updateArticle" small round icon="save")
            q-btn.full-width(color="warning" @click="undoEdit") Undo
        .bg-primary.relative-position.window-height(v-else)
            img.absolute.fit(:src="article.image")
            .row.fit.ov.absolute
                .m-a.text-center
                    h2.text-white {{article.title}}
                    img.author(:src="article.user.image", @click="$router.push({name: 'user', params: {id: article.user.id}})")
                    .headline.text-white {{article.user.firstName}} {{article.user.lastName}}
                    .caption.text-grey Created {{article.createdAt | moment("from")}}
                    .caption.text-grey Updated {{article.updatedAt | moment("from")}}
                    q-btn(color="primary" v-if="canEdit" @click="editArticle") Edit
                    q-btn(color="info" @click.native="shareArticle") Share
                    q-btn(color="negative" v-if="canEdit") Delete
                        q-popover(ref="deleteArticlePopover")
                            .bg-error(style="padding: 16px")
                                .title.white--text Delete Article
                            div(style="padding: 16px")
                                q-field(icon="vpn_key")
                                    q-input(v-model="deleteVerification" float-label="Article Title")
                                q-btn.full-width(color="negative" @click="deleteArticle", :disabled="deleteVerification !== article.title") Delete

        .row
            .col-xs-12.col-sm-6(v-if="edit")
                code-mirror.markdown--editor(v-model="article.body", mode="text/x-gfm" key="editor", @save="updateArticle")
            .col-xs-12(:class="edit ? 'col-sm-6' : 'col-sm-12'").pa-0
                q-card(key="preview" v-if="article.body").article-preview
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
                deleteVerification: ''
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
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.location.href)}`)
            },
            async deleteArticle() {
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
                    this.$router.push({ name: 'current_user' })
                } catch (e) {

                }
            },
            async updateArticle() {
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
                } catch (e) {

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
                    variables() {
                        return {
                            id: this.id || 0
                        }
                    },
                    pollInterval: 1000,
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