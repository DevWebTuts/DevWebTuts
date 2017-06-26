<template lang="pug">
div
    input(type="file" hidden ref="file", @change="uploadArticleImage")
    .layout.row.vh-100-min.ma-0(v-if="loading")
        .m-a
            v-progress-circular(indeterminate, :size="200")
    .vh-100-min(v-else-if="article && !loading")
        .fixed(style="top: 88%; right: 2%; z-index: 9999")
            v-btn(light floating warning @click.native="undoEdit" v-if="edit && canEdit" style="align-self: flex-end;")
                v-icon undo
            v-btn(light floating primary @click.native="edit = !edit" v-if="canEdit" style="align-self: flex-end;")
                v-icon {{edit ? 'save' : 'edit'}}
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
                                img(:src="article.user.image" 
                                key="userImage"
                                style="border-radius: 100%; height: 300px; width: 300px; border: 1px solid white;")
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
            img(:src="article.image" style="height: 100px; width: 100px; cursor: pointer;" @click="$refs.file.click()").mr-4
            v-text-field(v-model="article.title" hide-details label="Title" light)
        v-layout(row wrap, :class="[edit ? 'hidden-xs-only' : '']").ma-0
            v-flex(xs12, sm6  v-if="edit").pa-0
                codemirror(v-model="article.body", mode="text/x-markdown" key="editor")
            v-flex(xs12, :class="edit ? 'sm6' : 'sm12'").pa-0
                v-container(fluid v-html="result" style="max-width: 100%;" key="preview")
        v-tabs(light v-if="edit" grow scroll-bars).hidden-sm-and-up
            v-tabs-bar.accent(slot="activators")
                v-tabs-item(href="edit") Edit
                v-tabs-item(href="preview") Preview
                v-tabs-slider.primary
            v-tabs-content(id="edit")
                codemirror(v-model="article.body", mode="text/x-markdown" key="editor" v-if="edit")
            v-tabs-content(id="preview")
                v-container(fluid v-html="result" style="max-width: 100%;" key="preview")
</template>

<script>
    import gql from '../gql';
    import axios from 'axios';
    import marked from 'marked';
    import { mapGetters } from 'vuex';
    export default {
        name: 'article',
        props: ['id','currentUser'],
        data() {
            return {
                loading: 0,
                body: '',
                edit: false,
                oldArticle: null,
                undo: true,
                article: {
                    id: 0,
                    body: '',
                    title: '',
                    image: ''
                },
            }
        },
        methods: {
            undoEdit() {
                this.article = this.oldArticle;
                this.undo = true;
                this.edit = false;
            },
            uploadArticleImage(e) {
                console.log(e);
            }
        },
        computed: {
            result() {
                return marked(this.article.body);
            },
            canEdit() {
                return (this.currentUser && this.article) || (this.article.id === 0) || (this.article.user && this.article.user.id === this.currentUser.id);
            },
        },
        watch: {
            ['article.id'](val) {
               if(val !== 0) return;
               this.edit = true;
            },
            async edit(val) {
                if (val) {
                    this.oldArticle = this.article;
                    this.undo = false;
                    return;
                }
                if (!val && this.article && !this.undo) {
                    let {data} = await this.$apollo.mutate({
                        mutation: gql.mutations.saveArticle,
                        variables: {
                            id: this.article.id,
                            body: this.article.body,
                            title: this.article.title,
                            userId: this.article.user ? this.article.user.id : 0
                        }
                    })
                    if(!data) return;
                    console.log(this.article)
                    console.log(data);
                    //this.$router.push({name: 'article',params: {id: data.article.id}})
                }
            }
        },
        apollo: {
            article: {
                query: gql.queries.article,
                variables() {
                    return {
                        id: this.id || 0
                    }
                },
                loadingKey: 'loading',
                async result({data: {article}}) {
                    this.article = article ? {...article} : {
                        id: 0,
                        body: '',
                        title: '',
                        image: ''                       
                    }
                }
            }
        },
    }
</script>