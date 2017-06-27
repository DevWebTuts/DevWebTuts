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
				pollInterval: 1000,
				fetchPolicy: 'network-only'
            }
        },
		created() {
			window.addEventListener('storage',this.localStorageEvent);
		},
		destroyed() {
			window.removeEventListener('storage',this.localStorageEvent);
		},
		methods: {
			localStorageEvent(event) {
				console.log(event);
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
