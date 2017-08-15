<template lang="pug">
    #q-app
        .row.window-height(v-if="userLoading")
            .m-a
                q-spinner-gears(:size="200", color="primary")
        q-layout(view="lhr LpR lfr" reveal v-else)
            q-toolbar(slot="header").gt-xs
                img.cursor-pointer(v-lazy="'/statics/logo.png'" style="height: 50px; width auto;", @click="$router.push({name: 'index'})")
                q-toolbar-title #[span.text-info Dev]#[span.text-warning Web]#[span.text-positive Tuts]

                //q-btn(icon="home" outline @click="$router.push({name: 'index'})" dark style="width: 120px") home
                q-btn(icon="assignment" outline @click="$router.push({name: 'articles'})" dark style="width: 120px") Articles
                q-btn(icon="code" outline @click="code = true" dark style="width: 120px") Code
                q-btn(icon="assignment_ind" outline @click="$router.push({name: 'users'})" dark v-if="currentUser && currentUser.admin" style="width: 120px") Users

                template(v-if="currentUser")
                    q-btn(icon="exit_to_app" small round outline @click="$root.logout()")
                        span(style="font-size: 6px").roboto Logout
                    img.cursor-pointer.avatar.shadow-10(v-lazy="currentUser.image", @click="$router.push({name: 'current_user'})")
                q-btn(icon="vpn_key" small round outline @click="$root.login()" v-else)
                    span(style="font-size: 6px").roboto Login

            q-toolbar(slot="header").xs.justify-center
                q-btn(icon="home" small round outline @click="$router.push({name: 'index'})" dark)
                    span(style="font-size: 8px") Home
                q-btn(icon="assignment" small round outline @click="$router.push({name: 'articles'})" dark)
                    span(style="font-size: 8px") Tuts
                q-btn(icon="code" small round outline @click="code = true" dark)
                    span(style="font-size: 8px") Code
                q-btn(icon="assignment_ind" small round outline @click="$router.push({name: 'users'})" dark v-if="currentUser && currentUser.admin")
                    span(style="font-size: 8px") Users
                template(v-if="currentUser")
                    q-btn(icon="exit_to_app" small round outline @click="$root.logout()")
                        span(style="font-size: 6px").roboto Logout
                    img.cursor-pointer.avatar.shadow-10(v-lazy="currentUser.image", @click="$router.push({name: 'current_user'})")
                q-btn(icon="vpn_key" small round outline @click="$root.login()" v-else)
                    span(style="font-size: 6px").roboto Login

            router-view(style="padding-bottom: 80px" v-show="!code")

            .fit(v-show="code")
                q-toolbar
                    q-toolbar-title Code Editor
                    q-btn(icon="close" outline small round @click="code = false")
                code-editor

            //q-modal(ref="dialogCodeEditor" maximized)
                q-toolbar
                    q-toolbar-title Code Editor
                    q-btn(icon="close" outline small round @click="$refs.dialogCodeEditor.close()")
                code-editor

            q-fixed-position(corner="bottom-left", :offset="[18, 18]").z-absolute
                q-btn.animate-pop(v-back-to-top.animate="{duration: 200}" color="secondary" round icon="keyboard_arrow_up")

            .bg-secondary.layout-padding(slot="footer").text-white
                q-toolbar-title.text-center &copy; DevWebTuts 2017
                    span(slot="subtitle") Powered By: Vue, GraphCool and Auth0
                .text-center
                    q-btn(outline style="width: 150px; margin-top: 36px;", @click="review") Give us a Review
</template>

<script>
    import {Toast} from 'quasar'

    export default {
        name: "app",
        metaInfo: {
            title: 'DevWebTuts'
        },
        provide() {
            let auth = {};
            Object.defineProperties(auth, {
                currentUser: {
                    get: () => this.currentUser
                },
                userLoading: {
                    get: () => this.userLoading
                }
            })
            return {
                auth,
                drawer: this.drawer
            }
        },
        data() {
            return {
                code: false,
                userLoading: 0,
                autoSave: false,
                drawer: {
                    open: true,
                    mini: false
                },
                search: '',
                article: {
                    title: '',
                    body: '',
                    image: ''
                },
                dialog: false,
                dialogCodeEditor: false
            }
        },
        created() {
            this.$q.events.$on('app:showToast', this.showToast)
            this.$q.events.$on('app:auth', this.auth)
        },
        methods: {
            scrollUp() {
                return window.scroll(0, 0);
            },
            showToast(html, action) {
                Toast.create[action]({html})
            },
            auth() {
                this.$apollo.queries.currentUser.refetch()
            },
            review() {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLScEvuQmdmvIm0qTMHDp8wuByfL9pwXryOrb9WBgSHY2u36Qsw/viewform')
            }
        },

        apollo: {
            currentUser() {
                return {
                    query: this.$gql.queries.currentUser,
                    loadingKey: 'userLoading',
                    fetchPolicy: 'network-only'
                }
            }
        }
    }
</script>
