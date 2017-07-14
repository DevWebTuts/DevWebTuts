<template lang="pug">
div.pb-5
    .layout.row.vh-100-min.ma-0(v-if="loading")
        .m-a
            v-progress-circular(indeterminate, :size="200").accent--text
    .vh-100-min(v-else-if="article")
        v-container(fluid v-if="edit" style="padding-top: 64px;").accent.flexbox
            v-menu(offset-y, :close-on-content-click="false")
                img(slot="activator", :src="article.image" style="height: 100px; width: 100px; cursor: pointer;").mr-4
                v-container(fluid)
                    .title.pa-3 Article Image
                    v-text-field(label="Image" v-model="article.image")
            v-text-field(v-model="article.title" hide-details dark label="Title")
        .accent.relative(style="height: 100vh;" v-else)
            img.absolute.box(:src="article.image")
            .flexbox.box.ov.absolute
                .m-a.text-xs-center
                    .pa-3
                        .display-3.white--text {{article.title}}
                    img.author(:src="article.user.image", @click="$router.push({name: 'user', params: {id: article.user.id}})")
                    .headline.white--text {{article.user.firstName}} {{article.user.lastName}}
                    .caption.grey--text.text--lighten-3 Created {{article.createdAt | moment("from")}}
                    .caption.grey--text.text--lighten-3 Updated {{article.updatedAt | moment("from")}}
                    v-btn(primary v-if="canEdit" @click.native="editArticle") Edit
        v-layout(row wrap).ma-0
            v-flex(xs12, sm6  v-if="edit").pa-0
                codemirror(v-model="article.body", mode="text/x-markdown" key="editor", @save="updateArticle")
            v-flex(xs12, :class="edit ? 'sm6' : 'sm12'").pa-0
                v-container(fluid v-html="result" key="preview" v-if="article.body").pa-2
                comments(v-if="!edit", :comments="article.comments", :article="article.id")
        
</template>

<script>
    import gql from '../gql';
    import axios from 'axios';

    import { mapGetters } from 'vuex';
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
                ]
            }
        },
        data() {
            return {
                loading: 0,
                edit: false,
                result: '',
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
                    this.loading = 1;
                }
                worker.postMessage(val);
            }
        },
        methods: {
            workerEvent({ data }) {
                this.loading = 0;
                this.result = data;
            },
            undoEdit() {
                this.article = this.oldArticle;
                this.edit = false;
            },
            editArticle() {
                this.edit = true;
            },
            async updateArticle() {
                let { id, body, title, image, user } = this.article;
                let { data } = await this.$apollo.mutate({
                    mutation: gql.mutations.updateArticle,
                    variables: {
                        id,
                        body,
                        title,
                        image,
                    }
                })
                this.edit = false;
            },
        },
        computed: {
            canEdit() {
                return this.auth.currentUser && this.article.user && this.article.user.id === this.auth.currentUser.id
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
            }
        },
    }
</script>