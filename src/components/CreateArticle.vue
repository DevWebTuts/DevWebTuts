<template lang="pug">
    markdown-editor(v-model="article.body")
</template>

<script>

    export default {
        name: 'create-article',
        data() {
            return {
                article: {
                    body: "",
                    title: "",
                    image: ""
                }
            }
        }
    }
</script>
