<template lang="pug">
div
    input(type="file" hidden ref="file", @change="uploadArticleImage")
    .layout.row.vh-100-min.ma-0(v-if="loading")
        .m-a
            v-progress-circular(indeterminate, :size="200")
    .vh-100-min(v-else-if="article && !loading")
        .fixed(style="top: 88%; right: 2%; z-index: 9999")
            v-btn(light floating warning @click.native="undoEdit" v-if="edit && canEdit" style="align-self: flex-end;")
                v-icon(light) undo
            v-btn(light floating primary @click.native="edit ? saveArticle() : editArticle()" v-if="canEdit" style="align-self: flex-end;")
                v-icon(light) {{edit ? 'save' : 'edit'}}
        v-slide-y-transition
            v-layout.vh-100-min.ma-0(row wrap v-if="article.user && !edit")
                v-flex(xs12 sm6).pa-0.relative
                    img.box.absolute(:src="article.image")
                    .flexbox.box.absolute.ov
                        .m-a.text-xs-center.white--text
                            .display-1 {{article.title}}
                v-flex.pa-0(xs12 sm6).accent
                    .flexbox.box
                        .m-a.text-xs-center.white--text
                            transition(appear appearActiveClass="animated rollIn")
                                img.article--user(:src="article.user.image" key="userImage" @click="gotoUser")
                            .title.mt-2
                                | {{article.user.firstName}}
                                | {{article.user.middleName}}
                                | {{article.user.lastName}}
                            .text-xs-center
                                .caption {{article.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
                                small Created At
                            .text-xs-center
                                .caption {{article.updatedAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
                                small Updated At
            .vh-100-min.flexbox(v-else-if="!edit")
                .m-a
                    .display-2.text-xs-center Create New Article
        v-container(fluid v-if="edit").accent.flexbox
            v-menu(offset-y, :close-on-content-click="false")
                img(slot="activator", :src="article.image" style="height: 100px; width: 100px; cursor: pointer;").mr-4
                v-container(fluid)
                    .title.pa-3 Article Image
                    v-text-field(label="Image" v-model="article.image")
                    v-btn(primary light block @click.native="$refs.file.click()") Upload
            v-text-field(v-model="article.title" hide-details label="Title" light)

        v-layout(row wrap, :class="[edit ? 'hidden-xs-only' : '']").ma-0
            v-flex(xs12, sm6  v-if="edit").pa-0
                codemirror(v-model="article.body", mode="text/x-markdown" key="editor")
            v-flex(xs12, :class="edit ? 'sm6' : 'sm12'").pa-0
                v-container(fluid v-html="result" key="preview" v-if="article.body")
                hr
                .pa-3
                    .display-1 Comments
                    .flexbox(v-if="currentUser")
                        v-avatar
                            img(:src="currentUser.image")
                        v-text-field(hide-details multi-line v-model="comment.body" label="Write a Comment")
                        v-btn(primary light) Send
                comments(:comments="article.comments")
        v-tabs(light v-if="edit" grow scroll-bars).hidden-sm-and-up
            v-tabs-bar.accent(slot="activators")
                v-tabs-item(href="edit") Edit
                v-tabs-item(href="preview") Preview
                v-tabs-slider.primary
            v-tabs-content(id="edit")
                codemirror(v-model="article.body", mode="text/x-markdown" key="editor" v-if="edit")
            v-tabs-content(id="preview")
                v-container(fluid v-html="result" key="preview")
        
</template>

<script>
    import gql from '../gql';
    import axios from 'axios';

    import { mapGetters } from 'vuex';
    import markedWorker from 'worker-loader!../worker.js'

    const worker = new markedWorker();

    export default {
        name: 'article',
        props: ['id','currentUser'],
        data() {
            return {
                loading: 0,
                edit: false,
                oldArticle: null,
                article: {
                    id: 0,
                    body: '',
                    title: '',
                    image: ''
                },
                result: '',
                comment: {
                    id: 0,
                    body: '',
                    
                }
            }
        },
        created() {
            worker.addEventListener('message',this.workerEvent)
        },
        destroyed() {
            worker.removeEventListener('message',this.workerEvent)
        },
        watch: {
            ['article.body'](val) {
                worker.postMessage(val);
            }
        },
        methods: {
            workerEvent({data}) {
                this.result = data;
            },
            undoEdit() {
                this.article = this.oldArticle;
                this.edit = false;
            },
            uploadArticleImage(e) {
                console.log(e);
            },
            gotoUser() {
                let name = this.currentUser && this.article.user.id === this.currentUser.id ? 'current_user' : 'user';
                this.$router.push({name, params: {id: this.article.user.id}})
            },
            editArticle() {
                this.edit = true;
                this.oldArticle = this.article;
            },
            async saveArticle() {
                let {id,body,title,image,user} = this.article;
                let {data} = await this.$apollo.mutate({
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
                if(id === 0 && data && data.article) {
                    this.$router.push({name: 'article', params: {id: data.article.id}})
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
                result({data: {article}}) {
                    this.article = article ? {...article} : {
                        id: 0,
                        body: '',
                        title: '',
                        image: ''                       
                    }
                },
            }
        },
    }
</script>