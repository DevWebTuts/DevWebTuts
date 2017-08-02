<template lang="pug">
	#q-app
		q-layout(view="lhr LpR FFF" reveal v-if="!userLoading")
			q-toolbar(slot="header")
				q-toolbar-title #[span.text-info Dev]#[span.text-warning Web]#[span.text-positive Tuts]
				q-btn(icon="home" small round outline @click="$router.push({name: 'index'})" dark)
				q-btn(icon="assignment" small round outline @click="$router.push({name: 'articles'})" dark) 
				q-btn(icon="code" small round outline @click="$refs.dialogCodeEditor.open()" dark) 				
				q-btn(icon="dashboard" small round outline @click="$router.push({name: 'users'})" dark v-if="currentUser && currentUser.admin") 				
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
				q-btn(outline style="width: 150px" @click="review") Give as a Review
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
		review() {
			window.open('https://docs.google.com/forms/d/e/1FAIpQLScEvuQmdmvIm0qTMHDp8wuByfL9pwXryOrb9WBgSHY2u36Qsw/viewform')
		}
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
