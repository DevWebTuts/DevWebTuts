<template lang="pug">
  textarea
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/monokai.css';
  import 'codemirror/mode/htmlmixed/htmlmixed.js';
  export default {
    mounted() {
      this.value = this.value || '';
      this.editor = CodeMirror.fromTextArea(this.$el, {
          lineNumbers: true,
          lineWrapping: false,
          mode: 'text/html',
          theme: 'monokai',
          pollInterval: 1000,
          viewportMargin: Infinity
        })

      this.editor.setValue(this.value)
      this.editor.on('change', cm => {
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
