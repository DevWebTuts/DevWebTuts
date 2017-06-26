<template lang="pug">
    .flexbox.vh-100-min
        template(v-if="loading")
            .m-a
                v-progress-circular(indeterminate, :size="100")
        template(v-else-if="user")
            .box
                v-toolbar(light).accent
                    v-btn(light icon @click.native="$router.back")
                        v-icon arrow_back
                    v-toolbar-title {{user.firstName}}
                    v-text-field(v-model="search" hide-details label="Search" light)
                    v-btn(light icon @click.native="$store.dispatch('logout')")
                        v-icon exit_to_app
                .display-3.pa-3 Articles
                articles(:articles="user.articles" add)
</template>

<script>
    import gql from '../gql'
    export default {
        name: 'user',
        props: ['id'],
        data() {
            return {
                loading: 0,
                user: null
            }
        },
        apollo: {
            user: {
                query: gql.queries.user,
                loadingKey: 'loading',
                variables() {
                    return {
                        id: this.id
                    }
                },
                result({data}) {
                    console.log(data,this.id);
                }
            }
        }
    }
</script>
