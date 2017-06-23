<template lang="pug">
v-container(fluid)
    v-layout(row wrap)
        v-flex(xs12 sm6)
            codemirror(v-model="value", mode="text/x-markdown", @scrollInfo="scrollPreview" ref="editor")
        v-flex(xs12 sm6)
            div(v-html="result" style="overflow: auto; height: 300px" ref="preview")
</template>

<script>
    import marked from 'marked';

    export default {
        name: 'markdown-editor',
        props: ["value"],
        computed: {
            result() {
                return marked(this.value)
            }
        },
        methods: {
            scrollPreview(scrollInfo) {
                let el = this.$refs.preview;
                if (!el) return;
                el.scrollTop = scrollInfo.top;
                el.scrollLeft = scrollInfo.left;
            }
        }
    }
</script>
