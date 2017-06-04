import Vue from 'vue';
import App from './App.vue';
import CodeMirror from './CodeMirror.vue';
import {asyncComponents} from '../utils';
let registerComponents = (components,namespace = '') => Object.keys(components).forEach(component => Vue.component(`${namespace}${component}`.split(/(?=[A-Z])/).join("-").toLowerCase(), components[component]));

let components = {
    App,
    ...asyncComponents([
        'Home',
        'HTML',
        'Editor',
        'Callback',
        'Article',
        'Start',
    ]),
    CodeMirror
};
Vue.component('codemirror',components.CodeMirror);
Vue.component('editor',components.Editor);
export default components;
