<template>
    <section>
        <TransitionGroup name="list" tag="ul" class="contact-list">
            <li class="contact-preview" v-for="contact in contacts" :key="contact._id">
                <ContactPreview :contact="contact" />
                <section class="actions">
                    <RouterLink :to="`/contact/edit/${contact._id}`">
                    <button class="txt-btn">Edit</button>
                    </RouterLink>
                    <RouterLink :to="`/contact/${contact._id}`">
                    <button class="cheap-btn light-btn">Details</button>
                    </RouterLink>
                    
                    <button class="remove fa-solid xmark" @click="onRemoveContact(contact._id)"></button>
                </section>
            </li>
        </TransitionGroup>
    </section>
</template>

<script>
import ContactPreview from '@/cmps/contact-preview.vue'
export default {
    // props: ['contacts']
    props: {
        contacts: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('remove', contactId)
        },
    },
    components: {
        ContactPreview,
    },
}
</script>

<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}</style>
