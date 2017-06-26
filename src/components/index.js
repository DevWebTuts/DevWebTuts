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
        'MarkdownEditor',
        'CurrentUser',
        'User',
        'Comment',
        'Comments',
        'Reply',
        'Replies'
    ]),
    CodeMirror
};
Vue.component('codemirror', components.CodeMirror);
Vue.component('reply', components.Reply);
Vue.component('comment', components.Comment);
Vue.component('replies', components.Replies);
Vue.component('comments', components.Comments);
Vue.component('editor', components.Editor);
Vue.component('markdown-editor', components.MarkdownEditor);
Vue.component('articles', components.Articles);
export default components;