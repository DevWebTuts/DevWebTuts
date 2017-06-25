<template lang="pug">

</template>

<script>
    import gql from '../gql'
    export default {
        name: 'user',
        apollo: {
            user: {
                query: gql.queries.userArticles,
            }
        }
    }
</script>
