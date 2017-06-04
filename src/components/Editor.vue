<template lang="pug">
v-container(fluid)
    v-layout(row wrap)
        v-flex(xs12 sm6)
            codemirror(v-model="code")
        v-flex(xs12 sm6)
            iframe(:srcdoc="code" sandbox="allow-scripts allow-modals" style="border: solid 2px"
            frameborder="0" 
            scrolling="auto")
</template>

<script>
export default {
  name: 'editor',
  props: ['source','height'],
  data() {
      return {
          code: this.source || ''
      }
  }
}
</script>
