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
			.vh-100-min(ref="background" style="background: url('https://udemy-images.udemy.com/course/750x422/673420_5279_2.jpg') center center / cover no-repeat fixed")
			v-container(fluid) 
				v-layout(row wrap)
					v-flex(xs12 sm6 md3 lg2
						@click="$router.push({name: 'article',params: {id: article.id}})"
						v-for="(article,index) in articles",
						:key="index").mb-4
						v-card(hover style="min-height: 300px;" height="100%", :img="article.image")
							.layout.row.h-100.ov.white--text.ma-0
								.m-a.text-xs-center
									.display-1 {{article.title}}
</template>

<script>
	import gql from '../gql';

	export default {
		name: 'home',
		data() {
			return {
				scrolled: false,
			}
		},
		apollo: {
			articles: {
				query: gql.queries.articles,
				fetchPolicy: 'cache-and-network',
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
