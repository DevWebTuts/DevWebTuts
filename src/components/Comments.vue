<template lang="pug">
    v-container(fluid)
        template(v-for="(comment,index) in comments")
            comment(:key="index", :comment="comment")
</template>

<script>
export default {
    name: 'comments',
    props: ['comments']
}
</script>
