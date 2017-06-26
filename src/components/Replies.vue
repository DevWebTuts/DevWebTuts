<template lang="pug">
    v-container(fluid)
        template(v-for="(reply,index) in replies")
            reply(:reply="reply", :key="index")  
</template>

<script>
    export default {
        name: 'replies',
        props: ['replies']
    }
</script>
