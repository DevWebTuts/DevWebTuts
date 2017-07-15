<template lang="pug">
v-container(fluid).pa-2
    v-layout(row wrap)
        v-flex(xs12 sm6)
            code-mirror.CodeEditorDialog(v-model="code")
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
                code: `
                <html>
                    <head>
                        <title> DevWebTuts </title>

                        <style>
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            *:before,*:after {
                                box-sizing: border-box;
                            }
                            .welcome {
                                background: #222;
                                color: white;
                                font-size: 56px;
                                padding: 36px;
                                width: 100%;
                                height: calc(100vh - 140px);
                                font-family: Courier;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="welcome"> Welcome to my Tutorial </div>
                    </body>
                </html>
                `
            }
        },
        computed: {
            result() {
                return this.code;
            }
        },
    }
</script>
