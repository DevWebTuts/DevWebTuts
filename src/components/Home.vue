<template lang="pug">
	v-app
		v-toolbar(light fixed, :class="[scrolled ? '' : 'transparent elevation-0']")
			v-slide-x-transition
				v-btn(icon light @click.native="$router.back()" v-if="$route.name !== 'home'")
					v-icon arrow_back
			v-toolbar-title DevWebTuts
			v-toolbar-items
				v-toolbar-item(router :to="{name: 'start'}") 
					.title Sign In/Up
		main.pt-0
			.layout.row.wrap.vh-100-min.ma-0(ref="background" style="background: linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.75)), url('https://udemy-images.udemy.com/course/750x422/673420_5279_2.jpg') center center / cover no-repeat fixed")
				.m-a
					.display-2.white--text Create and Collaborate Web Development Tutorials
			.vh-100-min
				.pa-3
					.display-4 Tutorials
					hr(v-if="!loading")
					v-progress-linear(indeterminate v-else)
				articles(:articles="articles" v-if="!loading")
		v-footer
			.text-xs-right
				| &copy; Group 8

</template>

<script>
	import gql from '../gql';
	export default {
		name: 'home',
		data() {
			return {
				scrolled: false,
				loading: 0
			}
		},
		apollo: {
			articles: {
				query: gql.queries.articles,
				fetchPolicy: 'cache-and-network',
				loadingKey: 'loading'
			},
		},
		mounted() {
			window.addEventListener('scroll', this.scroll);
		},
		methods: {
			scroll() {
				let el = this.$refs.background;
				this.scrolled = window.pageYOffset > el.offsetHeight - 56;
			}
		},
		destroyed() {
			window.removeEventListener('scroll', this.scroll);
		}
	}
</script>
