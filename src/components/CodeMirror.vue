<template lang="pug">
  textarea
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/mode/htmlmixed/htmlmixed';
  import 'codemirror/mode/gfm/gfm';
  import 'codemirror/addon/selection/active-line';
  import 'codemirror/addon/hint/show-hint';
  import 'codemirror/addon/hint/html-hint';
  import 'codemirror/addon/hint/css-hint';
  import 'codemirror/addon/hint/javascript-hint';
  import 'codemirror/addon/edit/closetag';

  export default {
    name: 'codemirror',
    props: {
      mode: {
        type: String,
        default: 'text/html'
      },
      value: {
        type: String,
        default: ''
      },
    },

    mounted() {
      CodeMirror.commands.save = () => this.$emit('save');

      this.editor = CodeMirror.fromTextArea(this.$el, {
        lineWrapping: true,
        autoCloseTags: true,
        autofocus: true,
        mode: this.mode,
        theme: 'one-dark',
        viewportMargin: Infinity,
        extraKeys: {
          "Ctrl-Space": "autocomplete"
        },
        pollInterval: 2000
      })

      this.editor.setValue(this.value);

      this.editor.on('changes', cm => {
        this.$emit('input', cm.getValue());
      })

    },

    beforeDestroy() {
      this.editor.doc.cm.getWrapperElement().remove();
      CodeMirror.commands.save = null;
    },
  }
</script>
