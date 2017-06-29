<template lang="pug">
	div
		v-slide-x-transition(mode="out-in"): router-view(:currentUser="currentUser", :userLoading="userLoading")
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
				userLoading: 0
			}
		},
		apollo: {
			currentUser: {
				query: gql.queries.currentUser,
				loadingKey: 'userLoading',
				fetchPolicy: 'network-only',
				pollInterval: 2000
			}
		},

		computed: {
			...mapGetters([
				'$snackbar'
			])
		},
	}
</script>

<style lang="stylus">

	@import './app.styl';

</style>
