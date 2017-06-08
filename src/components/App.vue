<template lang="pug">
	div
		v-slide-x-transition(mode="out-in"): router-view(:currentUser="currentUser")
		v-snackbar(v-model="toast" v-bind="$snackbar") {{$snackbar ? $snackbar.message : ''}}
</template>

<script>
import gql from '../gql';
import {mapGetters} from 'vuex';
export default {
	name: "app",
	data() {
		return {
			toast: false
		}
	},
	computed: {
		...mapGetters([
			'$snackbar'
		])
	},
	apollo: {
		currentUser: {
			query: gql.queries.currentUser,
			fetchPolicy: 'network-only'
		}
	},
	watch: {
		currentUser(val) {
			this.$store.commit('CURRENT_USER',val);
		}
	}
}
</script>

<style lang="stylus">

	@import './app.styl';

</style>
