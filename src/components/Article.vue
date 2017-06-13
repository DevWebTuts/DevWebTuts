<template lang="pug">
    .vh-100-min(v-if="article && !loading")
        v-toolbar(light)
            v-btn(light icon @click.native="$router.back")
                v-icon arrow_back
            v-toolbar-title {{article.title}}
        v-container(fluid style="word-wrap: break-word")
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
                body: '',
                loading: 0,
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
                async result({ data: d }) {
                    if (!d) return;
                    this.loading = 1;
                    let { data } = await axios.get(d.article.url);
                    this.body = data;
                    this.loading = 0;
                }
            }
        },
    }
</script>
