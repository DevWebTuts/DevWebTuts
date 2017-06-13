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
      code: {
        type: String,
        default: ''
      }
    },
    mounted() {
      console.log(this.code);
      this.value = this.code || '';
      this.editor = CodeMirror.fromTextArea(this.$el, {
        lineNumbers: true,
        lineWrapping: true,
        mode: this.mode,
        theme: 'monokai',
        viewportMargin: Infinity
      })

      this.editor.setValue(this.value)
      this.editor.on('blur', cm => {
        this.value = cm.getValue();
        this.$emit('input', this.value)
      })
      this.$emit('ready', this.editor)
      this.unseenLineMarkers()
    },
    beforeDestroy() {
      this.editor.doc.cm.getWrapperElement().remove()
    },

    watch: {
      value(newVal, oldVal) {
        const value = this.editor.getValue()
        if (newVal !== value) {
          var scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.value = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      },
    },
    methods: {
      refresh() {
        this.editor.refresh()
      },
      unseenLineMarkers() {
        if (this.unseenLines !== undefined && this.marker !== undefined) {
          this.unseenLines.forEach(line => {
            var info = this.editor.lineInfo(line)
            this.editor.setGutterMarker(line, "breakpoints")
          })
        }
      }
    }
  }
</script>
