<template lang="pug">
    v-container(fluid)
        template(v-for="(comment,index) in comments")
            comment(:key="index", :comment="comment", :currentUser="currentUser")
</template>

<script>
export default {
    name: 'comments',
    props: ['comments','currentUser']
}
</script>
