import Vue from 'vue';
import App from './App.vue';
import CodeMirror from './CodeMirror.vue';
import {
    asyncComponents
} from '../utils';
let registerComponents = (components, namespace = '') => Object.keys(components).forEach(component => Vue.component(`${namespace}${component}`.split(/(?=[A-Z])/).join("-").toLowerCase(), components[component]));

let components = {
    App,
    ...asyncComponents([
        'Home',
        'HTML',
        'Editor',
        'Callback',
        'Article',
        'Articles',
        'CreateArticle',
        'MarkdownEditor'
    ]),
    CodeMirror
};
Vue.component('codemirror', components.CodeMirror);
Vue.component('editor', components.Editor);
Vue.component('markdown-editor', components.MarkdownEditor);
Vue.component('articles', components.Articles);
export default components;