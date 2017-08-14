<template lang="pug">
    #q-app
        q-layout(view="lhr LpR FFF" reveal v-if="!userLoading")
            q-toolbar(slot="header")
                q-toolbar-title #[span.text-info Dev]#[span.text-warning Web]#[span.text-positive Tuts]
                q-btn.xs(icon="home" small round outline @click="$router.push({name: 'index'})" dark)
                q-btn.xs(icon="assignment" small round outline @click="$router.push({name: 'articles'})" dark)
                q-btn.xs(icon="code" small round outline @click="$refs.dialogCodeEditor.open()" dark)
                q-btn.xs(icon="assignment_ind" small round outline @click="$router.push({name: 'users'})" dark v-if="currentUser && currentUser.admin")

                q-btn.gt-xs(icon="home" outline @click="$router.push({name: 'index'})" dark style="width: 120px") home
                q-btn.gt-xs(icon="assignment" outline @click="$router.push({name: 'articles'})" dark style="width: 120px") Articles
                q-btn.gt-xs(icon="code" outline @click="$refs.dialogCodeEditor.open()" dark style="width: 120px") Code
                q-btn.gt-xs(icon="assignment_ind" outline @click="$router.push({name: 'users'})" dark v-if="currentUser && currentUser.admin" style="width: 120px") Users

                template(v-if="currentUser")
                    q-btn(icon="exit_to_app" small round outline @click="$root.logout()" )
                    img.cursor-pointer.avatar.shadow-10(:src="currentUser.image", @click="$router.push({name: 'current_user'})")
                q-btn(icon="vpn_key" small round outline @click="$root.login()" v-else-if="$route.name === 'index'")
            router-view
            q-modal(ref="dialogCodeEditor" maximized)
                q-toolbar
                    q-toolbar-title Code Editor
                    q-btn(icon="close" outline small round @click="$refs.dialogCodeEditor.close()")

                code-editor
            q-fixed-position(corner="bottom-left", :offset="[18, 18]").z-absolute
                q-btn.animate-pop(v-back-to-top.animate="{duration: 200}" color="secondary" round icon="keyboard_arrow_up")
            q-toolbar(slot="footer")
                q-toolbar-title &copy; DevWebTuts 2017
                q-btn(outline style="width: 150px", @click="review") Give us a Review
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
