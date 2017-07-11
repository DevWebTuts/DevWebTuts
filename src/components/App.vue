<template lang="pug">
	v-app
		v-toolbar(dark, :fixed="!scrolledDown").accent--alpha
			v-slide-x-transition(mode="out-in")
				v-btn(icon v-if="$route.name === 'home'")
					v-icon code
				v-btn(icon v-else @click.native="$router.back()")
					v-icon arrow_back
			v-toolbar-title DevWebTuts
			v-spacer
			img.author(:src="currentUser.image", v-if="currentUser", @click="$router.push({name: 'current_user'})")
			v-btn(icon @click.native="$router.push({name: 'create_article'})")
				v-icon edit
			v-switch(v-model="autoSave" label="Auto Save" dark hide-details style="display: inline")
			v-btn(flat dark v-if="!currentUser", :disabled="userLoading !== 0",  @click.native="$store.dispatch('login')") Login 
			v-btn(icon v-else, :disabled="userLoading !== 0", @click.native="$store.dispatch('logout')")
				v-icon exit_to_app
		main.pt-0
			v-slide-x-transition(mode="out-in"): router-view(:currentUser="currentUser", :userLoading="userLoading", :autoSave="autoSave")
			v-snackbar(v-model="toast" v-bind="$snackbar") {{$snackbar ? $snackbar.message : ''}}
</template>

<script>
	import gql from '../gql';
	import { mapGetters } from 'vuex';
	export default {
		name: "app",
		data() {
			return {
				toast: false,
				userLoading: 0,
				lastScrollValue: 0,
				scrolledDown: false,
				autoSave: false
			}
		},
		apollo: {
			currentUser: {
				query: gql.queries.currentUser,
				loadingKey: 'userLoading',
				fetchPolicy: 'network-only',
				pollInterval: 1000
			}
		},
		computed: {
			...mapGetters([
				'$snackbar'
			])
		},
		methods: {
			scroll() {
				if (this.$route.name !== 'home') {
					this.scrolledDown = window.scrollY > this.lastScrollValue;
					this.lastScrollValue = window.scrollY;
				} else {
					this.lastScrollValue = 0;
				}
			}
		},
		created() {
			window.addEventListener("scroll", this.scroll);
		},
		destroyed() {
			window.addEventListener("scroll", this.scroll);
		}
	}
</script>

<style lang="stylus">

	@import './app.styl';

</style>
