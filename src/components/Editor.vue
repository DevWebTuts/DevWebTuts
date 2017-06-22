<template lang="pug">
v-container(fluid)
    v-layout(row wrap)
        v-flex(xs12 sm6)
            codemirror(:value="value", :mode="mode", @input="$emit('input',$event)", @scrollInfo="scrollPreview")
        v-flex(xs12 sm6)
            iframe(:srcdoc="result" sandbox="allow-scripts allow-same-origin" style="border: solid 2px"
            frameborder="0" ref="preview"
            scrolling="auto" v-if="mode !== 'text/x-markdown'")
            p(v-html="result" v-else style="overflow: auto; height: 300px" ref="previewMarkdown")
</template>

<script>
    import marked from 'marked';
    marked.setOptions({
        highlight(code) {
            return hljs.highlightAuto(code).value;
        }
    });
    export default {
        name: 'editor',
        props: ["mode", "value"],
        computed: {
            result() {
                return this.mode === 'text/x-markdown'
                    ? marked(this.value, { sanitize: true, breaks: true })
                    : this.value;
            }
        },
        methods: {
            scrollPreview(scrollInfo) {
                if (!this.$refs.previewMarkdown) return;
                console.dir(this.$refs.previewMarkdown);
                this.$refs.previewMarkdown.scrollTop(scrollInfo.top);
            }
        }
    }
</script>
