<template lang="pug">
  textarea
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/mode/htmlmixed/htmlmixed';
  import 'codemirror/mode/markdown/markdown'
  export default {
    name: 'codemirror',
    props: {
      mode: {
        type: String,
        default: 'text/html'
      },
    },
    mounted() {
      this.value = this.value || "";
      this.editor = CodeMirror.fromTextArea(this.$el, {
        lineNumbers: true,
        lineWrapping: true,
        mode: this.mode,
        theme: 'monokai',
        viewportMargin: Infinity
      })
      this.editor.setValue(this.value)
      this.editor.on('changes', cm => {
        this.value = cm.getValue();
        this.$emit('input', this.value)
      })
      this.editor.on("viewportChange", (cm, from, to) => {
        this.scroll();
      });
      this.editor.on("scroll", (cm, from, to) => {
        this.scroll();
      });
      this.$emit('ready', this.editor);
    },
    beforeDestroy() {
      this.editor.doc.cm.getWrapperElement().remove()
    },
    methods: {
      scroll() {
        let scrollInfo = this.editor.getScrollInfo()
        this.$emit("scrollInfo", scrollInfo);
      },
      scrollTo(left, top) {
        this.editor.scrollTo(left, top);
      }
    },
    watch: {
      value(newVal, oldVal) {
        const value = this.editor.getValue();
        if (newVal !== value) {
          let scrollInfo = this.editor.getScrollInfo();
          this.editor.setValue(newVal);
          this.value = newVal;
          this.scrollTo(left, top);
        }
      },
    },
  }
</script>

<<style lang="stylus">

</style>
