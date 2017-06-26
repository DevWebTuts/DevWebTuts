import hljs from 'highlight.js';
import marked from 'marked';
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

marked.setOptions({
    highlight(code) {
        console.log(code);
        return hljs.highlightAuto(code).value;
    }
});

onmessage = event => postMessage(marked(event.data))