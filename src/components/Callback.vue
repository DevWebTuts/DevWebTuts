<template lang="pug">
	pre {{result}}
</template>

<script>

export default {
	name: 'home',
	data() {
		return {
			result: ''
		}
	},
	async created() {
		let result = await this.$store.dispatch('auth0/session')
		console.log(result);
	}
}
</script>
