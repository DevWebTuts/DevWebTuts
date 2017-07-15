<template lang="pug">
v-container(fluid).pa-2
    v-layout(row wrap)
        v-flex(xs12 sm6)
            code-mirror(v-model="code")
        v-flex(xs12 sm6)
            iframe(:srcdoc="result", sandbox="allow-scripts allow-same-origin", 
            style="border: solid 2px; max-height: calc(100vh - 140px); height: calc(100vh - 140px);", 
            frameborder="0" ref="preview" scrolling="auto")
</template>

<script>
    export default {
        name: 'code-editor',
        data() {
            return {
                mode: 'text/html',
                code: ''
            }
        },
        computed: {
            result() {
                return this.code;
            }
        },
    }
</script>
