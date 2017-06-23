<template lang="pug">
    .vh-100-min(v-if="article && !loading")
        .fixed.flexbox.box(style="z-index: 999; flex-direction: column; align-items: space-between; justify-content: flex-end;")
            v-btn(light floating small @click.native="$router.back")
                v-icon arrow_back
            v-spacer
            v-btn(light floating warning @click.native="undoEdit" v-if="edit && canEdit" style="align-self: flex-end;")
                v-icon undo
            v-btn(light floating primary @click.native="edit = !edit" v-if="canEdit" style="align-self: flex-end;")
                v-icon {{edit ? 'save' : 'edit'}}
        v-slide-y-transition
            v-layout.accent(style="min-height: calc(100vh - 56px)" row wrap v-if="article.user && !edit").ma-0
                v-flex(xs12 sm6).pa-0.relative
                    img.box.absolute(:src="article.image")
                    .flexbox.box.absolute.ov
                        .m-a.text-xs-center.white--text
                            .display-1 {{article.title}}
                v-flex.pa-0(xs12 sm6)
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
        v-layout(row wrap, :class="[edit ? 'hidden-xs-only' : '']").ma-0
            v-flex(xs12, sm6  v-if="edit").pa-0
                codemirror(v-model="body", mode="text/x-markdown" key="editor")
            v-flex(xs12, :class="edit ? 'sm6' : 'sm12'").pa-0
                v-container(fluid v-html="result" style="max-width: 100%;" key="preview")
        v-tabs(light v-if="edit" grow scroll-bars).hidden-sm-and-up
            v-tabs-bar.accent(slot="activators")
                v-tabs-item(href="edit") Edit
                v-tabs-item(href="preview") Preview
                v-tabs-slider.primary
            v-tabs-content(id="edit")
                codemirror(v-model="body", mode="text/x-markdown" key="editor" v-if="edit")
            v-tabs-content(id="preview")
                v-container(fluid v-html="result" style="max-width: 100%;" key="preview")

    .layout.row.vh-100-min.ma-0(v-else)
        .m-a
            v-progress-circular(indeterminate, :size="200")
</template>

<script>
    import gql from '../gql';
    import axios from 'axios';
    import marked from 'marked';
    import { mapGetters } from 'vuex';
    export default {
        name: 'article',
        props: ['id'],
        data() {
            return {
                loading: 0,
                body: '',
                edit: false,
                oldBody: '',
                undo: true,
            }
        },
        methods: {
            undoEdit() {
                this.body = this.oldBody;
                this.undo = true;
                this.edit = false;
            }
        },
        computed: {
            result() {
                return marked(this.body);
            },
            canEdit() {
                return this.$currentUser && this.article && this.article.user && this.article.user.id === this.$currentUser.id;
            },
            ...mapGetters([
                '$currentUser'
            ])
        },
        watch: {
            async edit(val) {
                if (val) {
                    this.oldBody = this.body;
                    this.undo = false;
                    return;
                }
                if (!val && this.article && !this.undo) {
                    let res = await this.$apollo.mutate({
                        mutation: gql.mutations.saveArticle,
                        variables: {
                            id: this.article.id,
                            body: this.body,
                            title: this.article.title
                        }
                    })
                    console.log(res);
                }
            }
        },
        apollo: {
            article: {
                query: gql.queries.article,
                variables() {
                    return {
                        id: this.id
                    }
                },
                loadingKey: 'loading',
                async result({ data: { article: { body, url } } }) {
                    if (body) {
                        this.body = body;
                        return;
                    }
                    // try {
                    //     let { data } = await axios.get(url);
                    //     this.body = data;
                    // } catch (e) {
                    //     this.body = body;
                    // }
                }
            }
        },
    }
</script>

<<style lang="stylus">
    .MarkdownEditor
        height calc(100vh - 56px) !important
    
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@keyframes rollIn {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
.rollIn {
  -webkit-animation-name: rollIn;
  animation-name: rollIn;
}
</style>
