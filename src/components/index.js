import Vue from 'vue';
import App from './App.vue';
import cm from './CodeMirror.vue';
import {
    asyncComponents
} from '../utils';
let registerComponents = (components, namespace = '') => Object.keys(components).forEach(component => Vue.component(`${namespace}${component}`.split(/(?=[A-Z])/).join("-").toLowerCase(), components[component]));

let components = {
    App,
    ...asyncComponents([
        'Home',
        'HTML',
        'CodeEditor',
        'Article',
        'Articles',
        'CurrentUser',
        'User',
        'Comment',
        'Comments',
        'Reply',
        'Replies',
    ]),
    CodeMirror: cm
};
let {CodeMirror,Reply,Comment,Replies,Comments,Articles,CodeEditor} = components;
registerComponents({CodeMirror,Reply,Comment,Replies,Comments,Articles,CodeEditor})

export default components;