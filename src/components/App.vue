<template lang="pug">
	v-app
		v-toolbar(dark, :fixed="!scrolledDown").accent--alpha.select--none
			v-toolbar-side-icon
			v-slide-x-transition(mode="out-in")
				v-btn(icon v-if="$route.name !== 'home'" @click.native="$router.back()")
					v-icon arrow_back
			v-toolbar-title DevWebTuts
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
				autoSave: false,
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
