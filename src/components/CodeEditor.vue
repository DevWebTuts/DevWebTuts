<template lang="pug">
    .row(style="height: calc(100vh - 54px) !important")
        .col-xs-12.col-sm-6.fit
            code-mirror.CodeEditorDialog(v-model="code").full-height
        .col-xs-12.col-sm-6.relative-position
            iframe.fit.absolute(:srcdoc="result", allowTransparency="true" onload="this.style.visibility = 'visible';" sandbox="allow-scripts allow-same-origin",
            style="border: 0; min-height: calc(100vh - 52px); visibility: hidden; background; white; top: 0; left: 0; z-index: 1",
            frameborder="0" key="preview" scrolling="auto").fit
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
