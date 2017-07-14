<template lang="pug">
	v-app(v-if="!userLoading")
		v-navigation-drawer.accent--alpha(dark clipped v-model="drawer.open", :mini-variant="drawer.mini", persistent overflow enable-resize-watcher)
			v-list(dark).pa-0.transparent
				template(v-if="currentUser")
					v-list-tile(avatar)
						v-list-tile-avatar(@click.stop="drawer.mini = !drawer.mini")
							img(:src="currentUser.image")
						v-list-tile-content
							v-list-tile-title {{currentUser.firstName}} {{currentUser.lastName}}
							v-list-tile-sub-title {{currentUser.createdAt | moment("from")}}
						v-list-tile-action
							v-btn(icon dark @click.native.stop="drawer.mini = !drawer.mini")
								v-icon chevron_left
					v-list-tile(avatar @click.native="$router.push({name: 'home'})")
						v-list-tile-avatar
							v-icon(dark) home
						v-list-tile-title Home
					v-list-tile(avatar @click.native="$router.push({name: 'create_article'})")
						v-list-tile-avatar
							v-icon(dark) edit
						v-list-tile-title New Article
					v-list-tile(avatar @click.native="$router.push({name: 'current_user'})")
						v-list-tile-avatar
							v-icon(dark) assignment
						v-list-tile-title Articles
				v-list-tile(avatar)
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
		main.pt-0
			v-container(fluid).pa-0
				v-slide-x-transition(mode="out-in"): router-view
				v-snackbar(v-model="toast" v-bind="$snackbar") {{$snackbar ? $snackbar.message : ''}}
		v-footer.primary
</template>

<script>
	import gql from '../gql';
	import { mapGetters } from 'vuex';
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
				toast: false,
				userLoading: 0,
				autoSave: false,
				drawer: {
					open: true,
					mini: true
				},
				search: ''
			}
		},
		apollo: {
			currentUser: {
				query: gql.queries.currentUser,
				loadingKey: 'userLoading',
				fetchPolicy: 'network-only',
				pollInterval: 1000,
			}
		},
		computed: {
			...mapGetters([
				'$snackbar'
			]),
		},
	}
</script>

<style lang="stylus">

	@import './app.styl';

</style>
