<template lang="pug">
    div(v-if="article" style="min-height: 100vh;")
        v-toolbar(light)
            v-btn(light icon @click.native="$router.back")
                v-icon arrow_back
            v-toolbar-title {{article.title}}
        v-container(fluid)
            p(v-html="result")
</template>

<script>
import queries from '../gql';
import marked from 'marked';
import axios from 'axios';
export default {
  name: 'article',
  props: ['id'],
  computed: {
        result() {
            return this.article.body ? marked(this.article.body) : '';
        }
  },
  apollo: {
      article: {
          query: gql.queries.article,
          variables() {
            return {
                id: this.id
            }
          } 
      }
  }
}
</script>
