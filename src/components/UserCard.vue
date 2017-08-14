<template lang="pug">
    q-card
        q-toolbar.cursor-pointer
            q-toolbar-title
                | {{user.firstName}} {{user.middleName}}, {{user.lastName}}
                span(slot="subtitle") Registered At: {{user.createdAt | moment("from")}}
            q-btn(outline color="negative" round small icon="delete")
                q-popover(ref="deleteUserPopup")
                    q-toolbar
                        q-toolbar-title Delete User
                        q-btn(outline color="white" round small icon="close", @click="$refs.deleteUserPopup.close()")
                    div(style="padding: 24px")
                        q-field(icon="title")
                            q-input(v-model="deleteVerification" float-label="Enter User Full Name")
                        q-btn.full-width(color="negative" icon="delete" loader @click="deleteUser", :disabled="!deleteVerified") Delete User
        q-card-media(style="height: 300px; width 100%", @click="$router.push({name: 'user', params: {id: user.id}})")
            img(v-lazy="user.image").fit

</template>

<script>
export default {
    name: 'user-card',
    props: ['user'],
    data() {
        return {
            deleteVerification: ''
        }
    },
    computed: {
        deleteVerified() {
            return `${this.user.firstName} ${this.user.lastName}` === this.deleteVerification
        }
    },
    methods: {
        async deleteUser(e, done) {
            try {
                await this.$apollo.mutate({
                    mutation: this.$gql.mutations.deleteUser,
                    variables: {
                        id: this.user.id
                    }
                })
                this.$q.events.$emit('app:users')
                this.$q.events.$emit('app:showToast', 'Deleted User Successfully', 'positive')
            } catch (error) {
                this.$q.events.$emit('app:showToast', 'Error Deleting User', 'negative')
            } finally {
                done()
            }
        }
    }
}
</script>
