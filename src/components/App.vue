<template lang="pug">
	div
		v-slide-x-transition(mode="out-in"): router-view
		v-snackbar(v-model="toast" v-bind="$snackbar") {{$snackbar ? $snackbar.message : ''}}
</template>

<script>
	import { mapGetters } from 'vuex';
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
	}
</script>

<style lang="stylus">

	@import './app.styl';

</style>
