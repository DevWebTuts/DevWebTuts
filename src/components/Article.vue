<template lang="pug">
    .vh-100-min(v-if="article && !loading")
        v-toolbar(light)
            v-btn(light icon @click.native="$router.back")
                v-icon arrow_back
            v-toolbar-title {{article.title}}
            v-spacer
            v-btn(light icon @click.native="edit = !edit")
                v-icon {{edit ? 'save' : 'edit'}}
        v-container(fluid)
            v-layout(row wrap)
                v-flex(:class="[edit ? 'sm6' : 'sm12']" xs12 v-if="edit")
                    codemirror(v-model="body", :code="body", mode="text/x-markdown" @input="blur")
                v-flex(:class="[edit ? 'sm6' : 'sm12']" xs12)
                    p(v-html="result" style="max-width: 100%;")
    .layout.row.vh-100-min.ma-0(v-else)
        .m-a
            v-progress-circular(indeterminate, :size="200")
</template>

<script>
    import gql from '../gql';
    import marked from 'marked';
    import axios from 'axios';
    marked.setOptions({
        highlight(code) {
            return hljs.highlightAuto(code).value;
        }
    });
    export default {
        name: 'article',
        props: ['id'],
        data() {
            return {
                loading: 0,
                body: '',
                edit: false
            }
        },
        computed: {
            result() {
                return marked(this.body, { sanitize: true, breaks: true });
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
                    try {
                        let { data } = await axios.get(url);
                        this.body = data;
                    } catch (e) {
                        this.body = body;
                    }
                }
            }
        },
        methods: {
            blur(blur) {
                console.log(blur)
            }
        },
        mounted() {

        }
    }
</script>
