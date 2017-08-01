import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
    // '@' is aliased to src/components
    return () => System.import(`@/${component}.vue`)
}
Vue.component('comments', load('Comments'))
Vue.component('comment', load('Comment'))
Vue.component('replies', load('Replies'))
Vue.component('articles', load('Articles'))
Vue.component('reply', load('Reply'))
Vue.component('article-card', load('ArticleCard'))
Vue.component('users', load('Users'))
Vue.component('user-card', load('UserCard'))
Vue.component('code-editor', load('CodeEditor'))
Vue.component('code-mirror', load('CodeMirror'))

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: load('Index'),
            name: 'index'
        },
        {
            path: '/articles/:id',
            component: load('Article'),
            name: 'article',
            props: true,
        },
        {
            path: '/articles',
            component: load('AllArticles'),
            name: 'articles',
            props: true,
        },
        {
            path: '/user',
            component: load('CurrentUser'),
            name: 'current_user',
        },
        {
            path: '/users',
            component: load('AllUsers'),
            name: 'users',
        },
        {
            path: '/user/:id',
            component: load('User'),
            name: 'user',
            props: true
        },

        {
            path: '*',
            component: load('Error404')
        }
    ]
})