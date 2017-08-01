<template lang="pug">
	#q-app
		q-layout(view="lhr LpR FFF" reveal v-if="!userLoading")
			q-toolbar(slot="header")
				q-toolbar-title #[span.text-info Dev]#[span.text-warning Web]#[span.text-positive Tuts]
				q-btn(icon="home" small round outline @click="$router.push({name: 'index'})" dark)
				q-btn(icon="assignment" small round outline @click="$router.push({name: 'articles'})" dark) 
				q-btn(icon="code" small round outline @click="$refs.dialogCodeEditor.open()" dark) 				
				template(v-if="currentUser")
					q-btn(icon="exit_to_app" small round outline @click="$root.logout()" )
					img.cursor-pointer.avatar.shadow-10(:src="currentUser.image" @click="$router.push({name: 'current_user'})")
				q-btn(icon="vpn_key" small round outline @click="$root.login()" v-else-if="$route.name === 'index'")
			router-view
			q-modal(ref="dialogCodeEditor" maximized)
				q-toolbar
					q-toolbar-title Code Editor
					q-btn(icon="close" outline small round @click="$refs.dialogCodeEditor.close()")

				code-editor
			q-toolbar(slot="footer")
				q-toolbar-title &copy; DevWebTuts 2017

	//v-app(v-if="!userLoading")
		v-snackbar(v-model="toast" v-bind="$snackbar") {{$snackbar ? $snackbar.message : ''}}
		v-dialog(fullscreen v-model="dialogCodeEditor")
			v-card
				v-card-title.primary.pa-2
					.headline.white--text Code Editor
					v-spacer
					v-btn(icon dark @click.native="dialogCodeEditor = false")
						v-icon close
				v-card-text.pa-0
					code-editor
		v-dialog(v-model="dialog" persistent)
			v-card
				v-card-title.primary
					.headline.white--text Create New Article
				v-card-text
					v-text-field(v-model="article.title" hide-details label="Title")
					img(:src="article.image || 'https://s-media-cache-ak0.pinimg.com/originals/c6/c0/d9/c6c0d9b4b1fbd9dc73296a58e2dfa37e.png'" style="height: auto; width: 100%;")
					v-text-field(v-model="article.image" hide-details label="Image")
				v-card-actions
					v-spacer
					v-btn(flat error @click.native="dialog = false") Cancel
					v-btn(flat primary @click.native="createArticle") Save
		v-navigation-drawer.accent--alpha(dark clipped v-model="drawer.open", :mini-variant="drawer.mini", persistent overflow enable-resize-watcher)
			v-list(dark).pa-0.transparent
				v-slide-x-transition(mode="out-in")
					v-list-tile(avatar v-if="drawer.mini" @click.native.stop="drawer.mini = false")
						v-list-tile-avatar
							v-icon(dark) chevron_right
				v-list-tile(avatar v-if="currentUser")
					v-list-tile-avatar(@click.stop="drawer.mini = !drawer.mini")
						img(:src="currentUser.image")
					v-list-tile-content
						v-list-tile-title {{currentUser.firstName}} {{currentUser.lastName}}
						v-list-tile-sub-title {{currentUser.createdAt | moment("from")}}
					v-list-tile-action
						v-btn(icon dark @click.native.stop="drawer.mini = !drawer.mini")
							v-icon chevron_left
				v-list-tile(avatar @click.native="$router.push({name: 'index'})")
					v-list-tile-avatar
						v-icon(dark) home
					v-list-tile-title Home
					v-list-tile-action(v-if="!currentUser")
						v-btn(icon dark @click.native.stop="drawer.mini = !drawer.mini")
							v-icon chevron_left
				v-list-tile(avatar @click.native.stop="dialog = true" v-if="currentUser")
					v-list-tile-avatar
						v-icon(dark) edit
					v-list-tile-title New Article
				v-list-tile(avatar @click.native="$router.push({name: 'current_user'})" v-if="currentUser")
					v-list-tile-avatar
						v-icon(dark) assignment
					v-list-tile-title Articles
				v-list-tile(avatar @click.native.stop="dialogCodeEditor = true")
					v-list-tile-avatar
						v-icon(dark) code
					v-list-tile-title Code Editor
				v-list-tile(avatar v-if="!currentUser" @click.native="$store.dispatch('login')")
					v-list-tile-avatar
						v-icon(dark) vpn_key
					v-list-tile-title Login					
				v-list-tile(avatar v-else @click.native="$store.dispatch('logout')")
					v-list-tile-avatar
						v-icon(dark) exit_to_app
					v-list-tile-title Logout
		v-toolbar(dark, fixed).accent--alpha
			v-toolbar-side-icon(@click.native.stop="drawer.open = !drawer.open" style="margin-left: 22px; margin-right: 24px;")
			v-toolbar-title DevWebTuts
			v-spacer
			v-text-field(label="Search" single-line dark hide-details append-icon="search" v-model="search")
		main.pt-0.pb-5
			v-container(fluid).pa-0
				v-slide-x-transition(mode="out-in"): router-view
		v-footer(fixed).primary
			.white--text &copy; DevWebTuts 2017
			v-spacer
			v-btn(icon dark @click.native="scrollUp")
				v-icon keyboard_arrow_up
</template>

<script>
import { Toast } from 'quasar'
export default {
	name: "app",
	metaInfo: {
		title: 'DevWebTuts'
	},
	provide() {
		let auth = {};
		Object.defineProperties(auth, {
			currentUser: {
				get: () => this.currentUser,
			},
			userLoading: {
				get: () => this.userLoading,
			},
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
				image: '',
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
			Toast.create[action]({ html })
		},
		auth() {
			this.$apollo.queries.currentUser.refetch()
		},
		async createArticle(e, done) {
			try {
				let { title, body, image } = this.article;
				if (!title || !this.currentUser) return;
				let { data } = await this.$apollo.mutate({
					mutation: gql.mutations.createArticle,
					variables: {
						title,
						body,
						image,
						userId: this.currentUser.id
					}
				})
				this.dialog = false;
				if (!data || !data.article) return;
				this.$router.push({ name: 'article', params: { id: data.article.id }, query: { action: 'edit' } })
			} catch (e) {

			} finally {
				done()
			}
		},

	},

	apollo: {
		currentUser() {
			return {
				query: this.$gql.queries.currentUser,
				loadingKey: 'userLoading',
				fetchPolicy: 'network-only',
			}
		}
	},
}
</script>
