<template lang="pug">
div.pb-5
    .layout.row.vh-100-min.ma-0(v-if="loading")
        .m-a
            v-progress-circular(indeterminate, :size="200").accent--text
    .vh-100-min(v-else-if="article && !loading", style="padding-top: 48px;")
        v-container(fluid v-if="edit").accent.flexbox
            v-menu(offset-y, :close-on-content-click="false")
                img(slot="activator", :src="article.image" style="height: 100px; width: 100px; cursor: pointer;").mr-4
                v-container(fluid)
                    .title.pa-3 Article Image
                    v-text-field(label="Image" v-model="article.image")
            v-text-field(v-model="article.title" hide-details dark label="Title")
        v-layout(row wrap).ma-0
            v-flex(xs12, sm6  v-if="edit").pa-0
                codemirror(v-model="article.body", mode="text/x-markdown" key="editor", @save="saveArticle", @input="autoSave ? saveArticle() : ''")
            v-flex(xs12, :class="edit ? 'sm6' : 'sm12'").pa-0
                .vh-100-min.relative.accent
                    img.absolute.box(:src="article.image" style="object-fit: contain")
                    .absolute.box.ov
                    .flexbox.box.absolute
                        .m-a.white--text
                            .display-1 {{article.title}}
                            .flexbox
                                v-avatar
                                    img(:src="article.user.image")
                                .text-xs-left.pa-3
                                    .subheading {{article.user.firstName}} {{article.user.lastName}}
                                    .caption.grey--text {{article.createdAt | moment("from")}}
                hr.my-3
                v-container(fluid v-html="result" key="preview" v-if="article.body")
                template(v-if="!edit && id")
                    hr
                    .pa-3
                        .display-1 Comments
                        template(v-if="currentUser")
                            .flexbox
                                v-avatar
                                    img(:src="currentUser.image")
                                .text-xs-left.pa-3
                                    .subheading {{currentUser.firstName}} {{currentUser.lastName}}
                                v-spacer
                                v-btn(primary fab small dark @click.native="saveComment")
                                    v-icon send
                            v-text-field(hide-details multi-line v-model="comment.body" label="Write a Comment", :rows="1")
                        v-btn(primary block v-else @click.native="$store.dispatch('login')") Login
                    comments(:comments="article.comments", :currentUser="currentUser")
        
</template>

<script>
    import gql from '../gql';
    import axios from 'axios';

    import { mapGetters } from 'vuex';
    import markedWorker from 'worker-loader!../worker.js'

    const worker = new markedWorker();

    export default {
        name: 'article',
        props: ['id', 'currentUser', 'autoSave'],
        metaInfo: {

        },
        data() {
            return {
                loading: 0,
                edit: false,
                oldArticle: null,
                article: {
                    id: 0,
                    body: '# Markdown Syntax',
                    title: 'Create New Article',
                    image: ''
                },
                result: '',
                comment: {
                    id: 0,
                    body: '',
                    userId: 0,
                    articleId: 0
                },
            }
        },
        created() {
            worker.addEventListener('message', this.workerEvent)
        },
        destroyed() {
            worker.removeEventListener('message', this.workerEvent)
        },
        mounted() {
            this.edit = this.id === undefined;
        },
        watch: {
            ['article.body'](val) {
                if (!this.edit) {
                    this.loading = 1;
                }
                worker.postMessage(val);
            }
        },
        methods: {
            async saveComment() {
                if (!this.currentUser && !this.article && !this.comment.body) return;
                this.comment.userId = this.currentUser.id;
                this.comment.articleId = this.article.id
                let { data } = await this.$apollo.mutate({
                    mutation: gql.mutations.saveComment,
                    variables: this.comment
                })
                this.comment.body = '';
            },
            workerEvent({ data }) {
                this.loading = 0;
                this.result = data;
            },
            undoEdit() {
                this.article = this.oldArticle;
                this.edit = false;
            },
            gotoUser() {
                let name = this.currentUser && this.article.user.id === this.currentUser.id ? 'current_user' : 'user';
                this.$router.push({ name, params: { id: this.article.user.id } })
            },
            editArticle() {
                this.edit = true;
                this.oldArticle = this.article;
            },
            async saveArticle() {
                let { id, body, title, image, user } = this.article;
                let { data } = await this.$apollo.mutate({
                    mutation: gql.mutations.saveArticle,
                    variables: {
                        id,
                        body,
                        title,
                        image,
                        userId: user ? user.id : this.currentUser ? this.currentUser.id : 0
                    }
                })
                this.edit = false;
                if (id === 0 && data && data.article) {
                    this.$router.push({ name: 'article', params: { id: data.article.id } })
                }
            },
        },
        computed: {
            canEdit() {
                return this.id ?
                    this.currentUser && this.article.user && this.article.user.id === this.currentUser.id
                    : this.currentUser;
            },
        },
        apollo: {
            article: {
                query: gql.queries.article,
                variables() {
                    return {
                        id: this.id || 0
                    }
                },
                pollInterval: 1000,
                loadingKey: 'loading',
                result({ data: { article } }) {
                    this.article = article ? { ...article } : {
                        id: 0,
                        body: '# Markdown Syntax',
                        title: 'Create New Article',
                        image: ''
                    }
                },
            }
        },
    }
</script>